import { z } from 'zod';

const ActivityApiScheduleTimeSchema = z.object({
  id: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

const ActivityApiScheduleSchema = z.object({
  date: z.string(),
  times: z.array(ActivityApiScheduleTimeSchema),
});

const ActivityApiSubImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});

export const createActivityApiResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  subImages: z.array(ActivityApiSubImageSchema),
  schedules: z.array(ActivityApiScheduleSchema),
});

export type CreateActivityApiResponse = z.infer<typeof createActivityApiResponseSchema>;
