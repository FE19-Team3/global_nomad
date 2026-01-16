import { z } from 'zod';

const reviewUserSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileImageUrl: z.string().url().nullable(),
});

const reviewSchema = z.object({
  id: z.number(),
  user: reviewUserSchema,
  activityId: z.number(),
  rating: z.number().min(0).max(5),
  content: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const activityReviewsResponseSchema = z.object({
  averageRating: z.number(),
  totalCount: z.number(),
  reviews: z.array(reviewSchema),
});
