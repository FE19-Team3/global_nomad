import { z } from 'zod';

const reviewUserSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
});

const reviewSchema = z.object({
  id: z.number(),
  user: reviewUserSchema,
  activityId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const activityReviewsResponseSchema = z.object({
  averageRating: z.number(),
  totalCount: z.number(),
  reviews: z.array(reviewSchema),
});
