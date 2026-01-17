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

export const ReservationWithActivityResponseDtoSchema = z.object({
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
  reservations: z.array(ReservationWithActivityResponseDtoSchema),
  totalCount: z.number(),
});

export type ReservationListResponseDto = z.infer<typeof ReservationListResponseSchema>;
