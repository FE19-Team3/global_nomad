import { clientApi } from '@/shared/api/client';
import { reservationResponseSchema } from '@/shared/schema/reservation/reservation-response.schema';

import type { HostReservationStatus } from './get-host-reservations';

type Params = {
  activityId: number;
  reservationId: number;
  status: HostReservationStatus;
};

export const updateReservationStatus = async ({ activityId, reservationId, status }: Params) => {
  const response = await clientApi.patch({
    path: `/my-activities/${activityId}/reservations/${reservationId}`,
    body: { status },
    schema: reservationResponseSchema,
  });

  return response.data;
};
