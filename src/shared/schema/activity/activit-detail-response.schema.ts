import { z } from 'zod';

export const legacyScheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const newScheduleSchema = z.object({
  date: z.string(),
  times: z.array(
    z.object({
      id: z.number(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
});

export const activityDetailResponseSchema = z.object({
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
  subImages: z.array(
    z.object({
      id: z.number(),
      imageUrl: z.string(),
    }),
  ),
  schedules: z.array(z.union([legacyScheduleSchema, newScheduleSchema])),
});

export type ActivityDetailResponse = z.infer<typeof activityDetailResponseSchema>;
