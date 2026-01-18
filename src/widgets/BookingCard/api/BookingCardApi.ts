import { clientApi } from '@/shared/api/client';
import { ReservationEditResponseSchema } from '@/shared/schema/reservation/reservationList/schema';

export const changeBookingStatus = async (reservationId: number) => {
  const body = {
    status: 'canceled',
  };

  return await clientApi.patch({
    path: `/my-reservations/${reservationId}`,
    body,
    schema: ReservationEditResponseSchema,
  });
};
