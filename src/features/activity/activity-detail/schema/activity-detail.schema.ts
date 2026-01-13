import { z } from 'zod';

export const activityDetailSchema = z.object({
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
  schedules: z.array(
    z.object({
      date: z.string(),
      times: z.array(
        z.object({
          id: z.number(),
          startTime: z.string(),
          endTime: z.string(),
        }),
      ),
    }),
  ),
});
