import { z } from 'zod';

export const reservationRequestSchema = z.object({
  scheduleId: z.number(),
  headCount: z.number().min(1),
});

export type ReservationRequest = z.infer<typeof reservationRequestSchema>;
