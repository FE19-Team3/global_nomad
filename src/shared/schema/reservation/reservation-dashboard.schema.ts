import { z } from 'zod';

export const reservationDashboardSchema = z.array(
  z.object({
    date: z.string(),
    reservations: z.object({
      completed: z.number(),
      confirmed: z.number(),
      pending: z.number(),
    }),
  }),
);

export type ReservationDashboard = z.infer<typeof reservationDashboardSchema>;
