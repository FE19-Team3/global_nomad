import { clientApi } from '@/shared/api/client';
import { reservationResponseSchema } from '@/shared/schema/reservation/reservation-response.schema';

type Params = {
  activityId: number;
  body: unknown;
};

export const createReservationClient = ({ activityId, body }: Params) => {
  return clientApi.post({
    path: `/activities/${activityId}/reservations`,
    body,
    schema: reservationResponseSchema,
  });
};
