'use client';

import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import { useMyActivities } from '@/features/activity/model/useMyActivities';
import type { HostReservationStatus } from '@/features/reservation/api/get-host-reservations';
import { getHostReservations } from '@/features/reservation/api/get-host-reservations';
import { getReservationDashboard } from '@/features/reservation/api/get-reservation-dashboard';
import { getReservedSchedule } from '@/features/reservation/api/get-reserved-schedule';
import { updateReservationStatus } from '@/features/reservation/api/update-reservation-status';
import { isApiError } from '@/shared/api';
import CloseIcon from '@/shared/assets/icons/ic_modal_close.svg';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { cn } from '@/shared/lib/cn';
import type { HostReservationsResponse } from '@/shared/schema/reservation/host-reservations.schema';
import { useModalStore } from '@/shared/stores/useModalStore';
import BottomSheet from '@/shared/ui/BottomSheet';
import Button from '@/shared/ui/Button/Button';
import DatePicker from '@/shared/ui/DatePicker/DatePicker';
import InfiniteList from '@/shared/ui/InfiniteList/InfiniteList';
import BaseModal from '@/shared/ui/modal/BaseModal';
import NoData from '@/shared/ui/NoData';
import { Select } from '@/shared/ui/Select';
import Text from '@/shared/ui/Text';

const STATUS_LABELS: Record<HostReservationStatus, string> = {
  pending: '신청',
  confirmed: '승인',
  declined: '거절',
};

const formatDateLabel = (date: string) =>
  new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const MyActivitiesReservationContent = () => {
  const queryClient = useQueryClient();
  const { openAlert } = useModalStore();
  const isTablet = useMediaQuery('(min-width: 768px)');
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(String(now.getFullYear()));
  const [currentMonth, setCurrentMonth] = useState(String(now.getMonth() + 1).padStart(2, '0'));
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [status, setStatus] = useState<HostReservationStatus>('pending');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const {
    data: activitiesData,
    isLoading: isActivitiesLoading,
    isError: isActivitiesError,
  } = useMyActivities({ size: 100 });
  const activities = useMemo(() => activitiesData?.activities ?? [], [activitiesData]);

  useEffect(() => {
    if (selectedActivityId || activities.length === 0) return;
    setSelectedActivityId(activities[0]?.id ?? null);
  }, [activities, selectedActivityId]);

  const selectedActivity = useMemo(
    () =>
      activities.find((activity) => activity.id === selectedActivityId) ?? activities[0] ?? null,
    [activities, selectedActivityId],
  );

  useEffect(() => {
    setSelectedDate(null);
    setSelectedScheduleId(null);
    setStatus('pending');
    setIsDetailOpen(false);
  }, [selectedActivity?.id]);

  useEffect(() => {
    if (selectedDate) return;
    setIsDetailOpen(false);
  }, [selectedDate]);

  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useQuery({
    queryKey: ['reservation-dashboard', selectedActivity?.id, currentYear, currentMonth],
    queryFn: () =>
      getReservationDashboard({
        activityId: selectedActivity?.id ?? 0,
        year: currentYear,
        month: currentMonth,
      }),
    enabled: Boolean(selectedActivity?.id),
  });

  const { events, availableDates } = useMemo(() => {
    if (!dashboardData) {
      return { events: [], availableDates: [] };
    }

    const dates = dashboardData
      .filter(
        (item) =>
          item.reservations.completed > 0 ||
          item.reservations.confirmed > 0 ||
          item.reservations.pending > 0,
      )
      .map((item) => item.date);

    const reservationEvents = dashboardData.flatMap((item) => {
      const { date, reservations } = item;
      const candidates = [
        { key: 'completed', label: '완료', count: reservations.completed },
        { key: 'pending', label: '예약', count: reservations.pending },
        { key: 'confirmed', label: '승인', count: reservations.confirmed },
      ] as const;

      return candidates
        .filter((candidate) => candidate.count > 0)
        .map((candidate) => ({
          date,
          title: `${candidate.label} ${candidate.count}`,
          className: `event-${candidate.key}`,
        }));
    });

    return { events: reservationEvents, availableDates: dates };
  }, [dashboardData]);

  useEffect(() => {
    if (!selectedDate) return;
    if (availableDates.includes(selectedDate)) return;
    setSelectedDate(null);
    setSelectedScheduleId(null);
  }, [availableDates, selectedDate]);

  const {
    data: schedulesData,
    isLoading: isSchedulesLoading,
    isError: isSchedulesError,
  } = useQuery({
    queryKey: ['reserved-schedule', selectedActivity?.id, selectedDate],
    queryFn: () =>
      getReservedSchedule({
        activityId: selectedActivity?.id ?? 0,
        date: selectedDate ?? '',
      }),
    enabled: Boolean(selectedActivity?.id && selectedDate),
  });

  useEffect(() => {
    if (!schedulesData || schedulesData.length === 0) {
      setSelectedScheduleId(null);
      return;
    }

    if (!selectedScheduleId) {
      setSelectedScheduleId(schedulesData[0].scheduleId);
      return;
    }

    const hasSchedule = schedulesData.some(
      (schedule) => schedule.scheduleId === selectedScheduleId,
    );
    if (!hasSchedule) {
      setSelectedScheduleId(schedulesData[0].scheduleId);
    }
  }, [schedulesData, selectedScheduleId]);

  const selectedSchedule = schedulesData?.find(
    (schedule) => schedule.scheduleId === selectedScheduleId,
  );

  const statusCounts = useMemo(() => {
    const counts = { pending: 0, confirmed: 0, declined: 0 };
    if (!schedulesData) return counts;
    schedulesData.forEach((schedule) => {
      counts.pending += schedule.count.pending;
      counts.confirmed += schedule.count.confirmed;
      counts.declined += schedule.count.declined;
    });
    return counts;
  }, [schedulesData]);

  const reservationsQuery = useInfiniteQuery<
    HostReservationsResponse,
    unknown,
    InfiniteData<HostReservationsResponse>,
    readonly unknown[],
    number | undefined
  >({
    queryKey: ['host-reservations', selectedActivity?.id, selectedScheduleId, status],
    queryFn: ({ pageParam = undefined }) =>
      getHostReservations({
        activityId: selectedActivity?.id ?? 0,
        scheduleId: selectedScheduleId ?? 0,
        status,
        cursorId: pageParam,
        size: 10,
      }),
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    initialPageParam: undefined,
    enabled: Boolean(selectedActivity?.id && selectedScheduleId),
  });

  const reservations = useMemo(
    () => reservationsQuery.data?.pages.flatMap((page) => page.reservations) ?? [],
    [reservationsQuery.data],
  );

  const totalCount = reservationsQuery.data?.pages[0]?.totalCount ?? 0;

  const updateMutation = useMutation({
    mutationFn: updateReservationStatus,
    onSuccess: () => {
      if (!selectedActivity?.id) return;
      queryClient.invalidateQueries({
        queryKey: ['reservation-dashboard', selectedActivity.id],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['reserved-schedule', selectedActivity.id],
        exact: false,
      });
      queryClient.refetchQueries({
        queryKey: ['host-reservations', selectedActivity.id],
        exact: false,
      });
    },
    onError: (error) => {
      if (!isApiError(error)) {
        openAlert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        return;
      }

      openAlert(error.message);
    },
  });

  const handleStatusUpdate = (reservationId: number, nextStatus: HostReservationStatus) => {
    if (!selectedActivity?.id) return;
    if (updateMutation.isPending) return;

    updateMutation.mutate({
      activityId: selectedActivity.id,
      reservationId,
      status: nextStatus,
    });
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsDetailOpen(true);
  };

  if (isActivitiesLoading) {
    return (
      <section className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-y-3">
          <Text.B18>내 체험 현황</Text.B18>
          <Text.M14 className="text-gray-500">
            내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
          </Text.M14>
        </div>
        <NoData text="체험 정보를 불러오는 중입니다." />
      </section>
    );
  }

  if (isActivitiesError) {
    return <NoData text="체험 정보를 불러오지 못했습니다." />;
  }

  if (activities.length === 0) {
    return <NoData text="아직 등록한 체험이 없어요" />;
  }

  const detailContent = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Text.B18>{selectedDate ? formatDateLabel(selectedDate) : ''}</Text.B18>
        <button type="button" onClick={() => setIsDetailOpen(false)} aria-label="닫기">
          <CloseIcon className="w-5 h-5 text-black" />
        </button>
      </div>

      <div className="flex gap-6 border-b border-gray-200">
        {(Object.keys(STATUS_LABELS) as HostReservationStatus[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setStatus(key)}
            className={cn(
              'pb-2 text-m-14 font-medium',
              status === key ? 'text-primary border-b-2 border-primary' : 'text-gray-500',
            )}
          >
            {STATUS_LABELS[key]} {statusCounts[key]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <Text.B14>예약 시간</Text.B14>
        {selectedDate && isSchedulesError && (
          <NoData text="예약 시간 정보를 불러오지 못했습니다." />
        )}
        {selectedDate && isSchedulesLoading && (
          <NoData text="예약 시간 정보를 불러오는 중입니다." />
        )}
        {selectedDate && !isSchedulesLoading && schedulesData?.length === 0 && (
          <NoData text="해당 날짜에 예약이 없습니다." />
        )}
        {!selectedDate && <NoData text="캘린더에서 날짜를 선택해 주세요." />}
        {selectedDate && schedulesData && schedulesData.length > 0 && (
          <Select.Root
            value={selectedScheduleId ? String(selectedScheduleId) : ''}
            onValueChange={(value) => setSelectedScheduleId(Number(value))}
          >
            <Select.Trigger
              placeholder="시간을 선택해 주세요"
              displayValue={
                selectedSchedule
                  ? `${selectedSchedule.startTime} - ${selectedSchedule.endTime}`
                  : ''
              }
            />
            <Select.Content>
              {schedulesData.map((schedule) => (
                <Select.Item key={schedule.scheduleId} value={String(schedule.scheduleId)}>
                  {schedule.startTime} - {schedule.endTime}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Text.B14>예약 내역</Text.B14>
        <Text.M12 className="text-gray-500">최신순 · {totalCount}건</Text.M12>
      </div>

      <div className="flex flex-col">
        {selectedScheduleId ? (
          reservationsQuery.isError ? (
            <div className="flex justify-center">
              <NoData text="예약 내역을 불러오지 못했습니다." />
            </div>
          ) : reservationsQuery.isFetching && reservations.length === 0 ? (
            <div className="flex justify-center">
              <NoData text="예약 내역을 불러오는 중입니다." />
            </div>
          ) : reservations.length === 0 && !reservationsQuery.isFetching ? (
            <div className="flex justify-center">
              <NoData text="예약 내역이 없습니다." />
            </div>
          ) : (
            <InfiniteList
              items={reservations}
              hasNextPage={reservationsQuery.hasNextPage}
              fetchNextPage={reservationsQuery.fetchNextPage}
              estimateSize={140}
              renderItem={(reservation) => (
                <div className="pb-4">
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex min-w-0 items-center gap-3">
                        <Text.M14 className="text-gray-500 whitespace-nowrap w-9 shrink-0">
                          닉네임
                        </Text.M14>
                        <Text.B16 className="min-w-0 truncate">{reservation.nickname}</Text.B16>
                      </div>
                      <div className="flex items-center gap-3">
                        <Text.M14 className="text-gray-500 whitespace-nowrap w-9 shrink-0">
                          인원
                        </Text.M14>
                        <Text.B16>{reservation.headCount}명</Text.B16>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2">
                      {reservation.status === 'pending' && (
                        <Button
                          variant="primary"
                          radius="full"
                          className="px-4 py-1"
                          onClick={() => handleStatusUpdate(reservation.id, 'confirmed')}
                        >
                          <Text.M14 className="text-white">승인</Text.M14>
                        </Button>
                      )}
                      {reservation.status === 'pending' && (
                        <Button
                          variant="secondary"
                          radius="full"
                          className="px-4 py-1"
                          onClick={() => handleStatusUpdate(reservation.id, 'declined')}
                        >
                          <Text.M14>거절</Text.M14>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            />
          )
        ) : (
          <NoData text="예약 시간을 선택해 주세요." />
        )}
      </div>
    </div>
  );

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-y-3">
        <h2 className="text-b-18">내 체험 현황</h2>
        <p className="text-m-14 text-gray-500">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </div>

      <div className="w-full">
        <Select.Root
          value={selectedActivityId ? String(selectedActivityId) : ''}
          onValueChange={(value) => setSelectedActivityId(Number(value))}
        >
          <Select.Trigger
            placeholder="체험을 선택해 주세요"
            displayValue={selectedActivity?.title ?? ''}
          />
          <Select.Content>
            {activities.map((activity) => (
              <Select.Item key={activity.id} value={String(activity.id)}>
                {activity.title}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="w-full lg:max-w-[640px]">
          {isDashboardLoading ? (
            <NoData text="내 체험 현황을 불러오는 중입니다." />
          ) : isDashboardError ? (
            <NoData text="내 체험 현황을 불러오지 못했습니다." />
          ) : (
            <DatePicker
              variant="reservation"
              limitRange={false}
              selectedDates={availableDates}
              selectedDate={selectedDate}
              events={events}
              onDateSelect={handleDateSelect}
              onMonthChange={(year, month) => {
                setCurrentYear(year);
                setCurrentMonth(month);
              }}
            />
          )}
        </div>
      </div>

      <BaseModal
        isOpen={isDetailOpen && isTablet}
        onClose={() => setIsDetailOpen(false)}
        showCloseButton={false}
      >
        {detailContent}
      </BaseModal>

      <BottomSheet isOpen={isDetailOpen && !isTablet} onClose={() => setIsDetailOpen(false)}>
        <BottomSheet.Content>{detailContent}</BottomSheet.Content>
      </BottomSheet>
    </section>
  );
};

export default MyActivitiesReservationContent;
