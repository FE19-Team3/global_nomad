'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import type { MyActivitiesQuery } from '@/features/activity/api/get-my-activities';
import useMyActivitiesInfiniteList from '@/features/activity/hooks/useMyActivitiesInfiniteList';
import { myActivitiesInfiniteQueryKey } from '@/features/activity/model/my-activities-infinite-query';
import { useDeleteMyActivity } from '@/features/activity/model/useDeleteMyActivity';
import { isApiError } from '@/shared/api';
import { useModalStore } from '@/shared/stores/useModalStore';
import Button from '@/shared/ui/Button/Button';
import NoData from '@/shared/ui/NoData';
import { Skeleton } from '@/shared/ui/Skeleton';
import Text from '@/shared/ui/Text';
import { ManageActivityCard } from '@/widgets/manage-activity-card/ManageActivityCard';

type MyActivitiesManageContentProps = {
  query?: MyActivitiesQuery;
};

const MyActivitiesManageContent = ({ query = {} }: MyActivitiesManageContentProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openAlert, openConfirm } = useModalStore();
  const { activities, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyActivitiesInfiniteList({ size: query.size });
  const deleteMutation = useDeleteMyActivity();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-3">
            <Skeleton.Row width={140} height={22} className="rounded-full" />
            <Skeleton.Row width={220} height={16} className="rounded-full" />
          </div>
          <Skeleton.Row width={130} height={40} className="rounded-full" />
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <article
              key={`my-activities-skeleton-${index}`}
              className="relative flex bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]"
            >
              <div className="flex flex-col flex-1 px-6 py-8 md:pl-10 md:pr-0 gap-3">
                <Skeleton.Row width="60%" height={20} className="rounded-full" />
                <div className="flex items-center gap-2">
                  <Skeleton.Circle size={20} />
                  <Skeleton.Row width={60} height={16} className="rounded-full" />
                </div>
                <Skeleton.Row width={120} height={20} className="rounded-full" />
                <div className="flex w-full items-center gap-2 mt-2">
                  <Skeleton.Row width={120} height={36} className="rounded-md" />
                  <Skeleton.Row width={120} height={36} className="rounded-md" />
                </div>
              </div>
              <div className="absolute right-6 top-6 shrink-0 md:m-8 h-24 w-24 md:h-auto md:w-35 order-2 overflow-hidden md:relative md:right-auto md:top-auto">
                <Skeleton.Rect width="100%" height="100%" className="rounded-xl md:rounded-4xl" />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return <p className="text-m-16 text-red-500">내 체험 목록을 불러오지 못했습니다.</p>;
  }

  const handleDelete = (activityId: number) => {
    openConfirm({
      message: '정말 삭제하시겠습니까?',
      onConfirm: () => {
        if (deleteMutation.isPending) return;

        deleteMutation.mutate(activityId, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: myActivitiesInfiniteQueryKey });
            openAlert('체험이 삭제되었습니다.');
          },
          onError: (e) => {
            if (!isApiError(e)) {
              openAlert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
              return;
            }

            if (e.status === 0 || e.status >= 500) {
              openAlert('요청에 실패했습니다. 잠시 후 다시 시도해 주세요.');
              return;
            }

            openAlert(e.message);
          },
        });
      },
    });
  };

  const handleEdit = (activityId: number) => {
    router.push(`/my-activities/${activityId}/edit`);
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-b-18">내 체험 관리</h2>
          <p className="text-m-14 text-gray-500">체험을 등록하거나 수정 및 삭제가 가능합니다.</p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="md"
          radius="md"
          onClick={() => router.push('/my-activities/new')}
        >
          <Text.B16>체험 등록하기</Text.B16>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <ManageActivityCard
            key={activity.id}
            activity={activity}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {activities.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <NoData text="아직 등록한 체험이 없어요" />
          </div>
        )}
        <div ref={sentinelRef} />
        {isFetchingNextPage && (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <article
                key={`my-activities-fetching-${index}`}
                className="relative flex bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]"
              >
                <div className="flex flex-col flex-1 px-6 py-8 md:pl-10 md:pr-0 gap-3">
                  <Skeleton.Row width="60%" height={20} className="rounded-full" />
                  <div className="flex items-center gap-2">
                    <Skeleton.Circle size={20} />
                    <Skeleton.Row width={60} height={16} className="rounded-full" />
                  </div>
                  <Skeleton.Row width={120} height={20} className="rounded-full" />
                  <div className="flex w-full items-center gap-2 mt-2">
                    <Skeleton.Row width={120} height={36} className="rounded-md" />
                    <Skeleton.Row width={120} height={36} className="rounded-md" />
                  </div>
                </div>
                <div className="absolute right-6 top-6 shrink-0 md:m-8 h-24 w-24 md:h-auto md:w-35 order-2 overflow-hidden md:relative md:right-auto md:top-auto">
                  <Skeleton.Rect width="100%" height="100%" className="rounded-xl md:rounded-4xl" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyActivitiesManageContent;
