'use client';

import { ActivityDetail } from '@/features/activity/activity-detail/model/activity-detail.types';
import { createReservationClient } from '@/features/reservation/useCreateReservation';
import { isApiError } from '@/shared/api';
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
  const handleReserve = async (scheduleId: number) => {
    try {
      await createReservationClient({
        activityId,
        body: {
          scheduleId,
          headCount,
        },
      });

      alert('예약이 완료되었습니다.');
    } catch (e) {
      if (isApiError(e) && e.status === 409) {
        alert(e.message);
      }
    }
  };

  return <ReservationSection price={price} schedules={schedules} onReserve={handleReserve} />;
}
