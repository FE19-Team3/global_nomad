import { z } from 'zod';

export const ReservationStatusEnum = z.enum([
  'pending',
  'confirmed',
  'declined',
  'canceled',
  'completed',
]);

export const ActivitySchema = z.object({
  id: z.number(),
  title: z.string(),
  bannerImageUrl: z.string(),
});

export const ReservationSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),

  activity: ActivitySchema,

  scheduleId: z.number(),
  status: ReservationStatusEnum,

  reviewSubmitted: z.boolean(),

  totalPrice: z.number(),
  headCount: z.number(),

  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ReservationListResponseSchema = z.object({
  cursorId: z.number().nullable(),
  reservations: z.array(ReservationSchema),
  totalCount: z.number(),
});

export const ReservationEditResponseSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: z.string(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ReservationDTO = z.infer<typeof ReservationSchema>;
export type ReservationListResponseDto = z.infer<typeof ReservationListResponseSchema>;
