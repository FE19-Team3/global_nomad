import { z } from 'zod';

import { reservationResponseSchema } from './reservation-response.schema';

export const hostReservationsSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  reservations: z.array(reservationResponseSchema),
});

export type HostReservationsResponse = z.infer<typeof hostReservationsSchema>;
