'use client';

import { ActivityDetail } from '@/features/activity/activity-detail/model/activity-detail.types';
import { createReservationClient } from '@/features/reservation/useCreateReservation';
import { isApiError } from '@/shared/api';
import { useModalStore } from '@/shared/stores/useModalStore';
import { useReservationStore } from '@/widgets/Reservation/store/reservationStore';
import { ReservationSection } from '@/widgets/Reservation/ui/ReservationSection';

type Schedule = ActivityDetail['schedules'][number];

type Props = {
  activityId: number;
  price: number;
  schedules: Schedule[];
};

export function ReservationContainer({ activityId, price, schedules }: Props) {
  const { headCount } = useReservationStore();
  const { openAlert } = useModalStore();
  const handleReserve = async (scheduleId: number) => {
    try {
      await createReservationClient({
        activityId,
        body: {
          scheduleId,
          headCount,
        },
      });
      openAlert('예약이 완료되었습니다.');
    } catch (e) {
      if (isApiError(e) && e.status === 409) {
        openAlert(e.message);
      }
    }
  };

  return <ReservationSection price={price} schedules={schedules} onReserve={handleReserve} />;
}
