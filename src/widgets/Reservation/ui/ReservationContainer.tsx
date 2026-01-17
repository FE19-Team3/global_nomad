'use client';

import { z } from 'zod';

import { ActivityDetail } from '@/features/activity/activity-detail/model/activity-detail.types';
import { createReservationClient } from '@/features/reservation/useCreateReservation';
import { isApiError } from '@/shared/api';
import { clientApi } from '@/shared/api/client/fetch';
import { useModalStore } from '@/shared/stores/useModalStore';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useAuth } from '@/widgets/header/model/useAuth';
import { useReservationStore } from '@/widgets/Reservation/store/reservationStore';
import { ReservationSection } from '@/widgets/Reservation/ui/ReservationSection';

type Schedule = ActivityDetail['schedules'][number];

type Props = {
  activityId: number;
  price: number;
  schedules: Schedule[];
  ownerId: number;
};

const schema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});

export function ReservationContainer({ activityId, price, schedules, ownerId }: Props) {
  const { user, isLoading } = useAuth();
  const { headCount } = useReservationStore();
  const { openAlert } = useModalStore();

  // 로딩 중에는 렌더 안 함
  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg">
        <Skeleton.Row height={24} className="mb-3" />
        <Skeleton.Rect height={40} className="mb-2" />
        <Skeleton.Rect height={40} className="mb-2" />
        <Skeleton.Rect height={48} />
      </div>
    );
  }
  // 로그인 상태면 예약 카드 숨김
  if (user && user.id === ownerId) return null;

  const handleReserve = async (scheduleId: number) => {
    try {
      await createReservationClient({
        activityId,
        body: { scheduleId, headCount },
      });
      openAlert('예약이 완료되었습니다.');
    } catch (e) {
      if (isApiError(e) && e.status === 409) {
        openAlert(e.message);
      }

      if (isApiError(e) && e.status === 401) {
        try {
          await clientApi.post({ path: '/refresh', schema });
          // await createReservationClient({
          //   activityId,
          //   body: { scheduleId, headCount },
          // });
          openAlert('예약이 완료되었습니다.');
        } catch (e2) {
          if (isApiError(e2)) {
            openAlert(e2.message);
            return;
          }
          openAlert('예약에 실패했습니다. 다시 시도해주세요.');
          return;
        }
      }
    }
  };
  return <ReservationSection price={price} schedules={schedules} onReserve={handleReserve} />;
}
