import { z } from 'zod';

// 서버 응답 스키마
export const NotificationApiItemSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const NotificationApiResponseSchema = z.object({
  cursorId: z.number().nullable(), // null 가능
  notifications: z.array(NotificationApiItemSchema),
  totalCount: z.number(),
});

// 타입 추론
export type NotificationApiItem = z.infer<typeof NotificationApiItemSchema>;
export type NotificationApiResponse = z.infer<typeof NotificationApiResponseSchema>;
