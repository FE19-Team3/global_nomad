import { z } from 'zod';

import { ActivitySubImageSchema } from './activity-image.schema';
import { ActivityScheduleSchema } from './activity-schedule.schema';

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
  subImages: z.array(ActivitySubImageSchema),
  schedules: z.array(ActivityScheduleSchema),
});

export type CreateActivityApiResponse = z.infer<typeof createActivityApiResponseSchema>;
