import { z } from 'zod';

export const reservationResponseSchema = z.object({
  id: z.number(),
  nickname: z.string().optional(),
  teamId: z.string(),
  userId: z.number(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: z.string(),
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ReservationResponse = z.infer<typeof reservationResponseSchema>;
