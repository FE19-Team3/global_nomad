import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.number(),

  content: z.string().min(1),

  rating: z.number().min(0).max(5),

  userId: z.number(),
  activityId: z.number(),

  teamId: z.string(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Review = z.infer<typeof reviewSchema>;
