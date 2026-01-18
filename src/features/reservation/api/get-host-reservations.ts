import { clientApi } from '@/shared/api/client';
import { hostReservationsSchema } from '@/shared/schema/reservation/host-reservations.schema';

export type HostReservationStatus = 'declined' | 'pending' | 'confirmed';

type Params = {
  activityId: number;
  scheduleId: number;
  status: HostReservationStatus;
  cursorId?: number;
  size?: number;
};

export const getHostReservations = async ({
  activityId,
  scheduleId,
  status,
  cursorId,
  size,
}: Params) => {
  const response = await clientApi.get({
    path: `/my-activities/${activityId}/reservations`,
    query: {
      scheduleId,
      status,
      ...(cursorId !== undefined ? { cursorId } : {}),
      ...(size !== undefined ? { size } : {}),
    },
    schema: hostReservationsSchema,
  });

  return response.data;
};
