import { z } from 'zod';

const ActivitySchema = z.object({
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
});

export const ActivityQuerySchema = z.object({
  method: z.enum(['offset', 'cursor']),
  cursorId: z.number().optional(),
  category: z.enum(['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙']).optional(),
  keyword: z.string().optional(),
  sort: z.enum(['most_reviewed', 'price_asc', 'price_desc', 'latest']).optional(),
  page: z.number().default(1),
  size: z.number().default(20),
});

export const ActivityListResponseSchema = z.object({
  cursorId: z.number().nullable().optional(),
  totalCount: z.number(),
  activities: z.array(ActivitySchema),
});

export type ActivityQuery = z.infer<typeof ActivityQuerySchema>;
export type ActivityListResponse = z.infer<typeof ActivityListResponseSchema>;
