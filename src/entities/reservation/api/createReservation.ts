import { serverApi } from '@/shared/api/server';
import { reservationRequestSchema } from '@/shared/schema/reservation/reservation-request.schema';
import { reservationResponseSchema } from '@/shared/schema/reservation/reservation-response.schema';

type Params = {
  activityId: number;
  body: unknown;
};

export const createReservation = ({ activityId, body }: Params) => {
  return serverApi.post({
    path: `/activities/${activityId}/reservations`,
    body: reservationRequestSchema.parse(body),
    schema: reservationResponseSchema,
  });
};
