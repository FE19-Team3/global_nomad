import { clientApi } from '@/shared/api/client';
import { ReservationListResponseSchema } from '@/shared/schema/reservation/reservationList/schema';

export type getReservationListParams = {
  cursorId?: number;
  size?: number;
  status?: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
};

export const getReservationList = async (params: getReservationListParams) => {
  const res = await clientApi.get({
    path: '/my-reservations',
    query: {
      size: params.size ?? 10,
      ...(params.cursorId !== undefined && { cursorId: params.cursorId }),
      ...(params.status !== undefined && { status: params.status }),
    },
    schema: ReservationListResponseSchema,
  });

  return res.data;
};
