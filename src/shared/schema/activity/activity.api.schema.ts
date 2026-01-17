import { z } from 'zod';

import { createActivityScheduleSchema } from './activity.form.schema';

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

const MyActivityItemSchema = z.object({
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

export const myActivitiesApiResponseSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  activities: z.array(MyActivityItemSchema),
});

export type MyActivitiesApiResponse = z.infer<typeof myActivitiesApiResponseSchema>;

export const uploadActivityImageResponseSchema = z
  .object({
    imageUrl: z.string().url().optional(),
    url: z.string().url().optional(),
    activityImageUrl: z.string().url().optional(),
  })
  .refine((value) => Boolean(value.imageUrl || value.url || value.activityImageUrl), {
    message: '업로드 이미지 URL이 없습니다.',
  });

export const updateMyActivityApiRequestSchema = z.object({
  title: z.string().min(1, '제목을 입력해 주세요.'),
  category: z.string().min(1, '카테고리를 선택해 주세요.'),
  description: z.string().min(1, '설명을 입력해 주세요.'),
  price: z.number().min(1, '가격은 0보다 큰 숫자만 입력해 주세요.'),
  address: z.string().min(1, '주소를 입력해 주세요.'),
  bannerImageUrl: z.string().url().or(z.literal('')),
  subImageIdsToRemove: z.array(z.number()).optional(),
  subImageUrlsToAdd: z.array(z.string().url()).optional(),
  scheduleIdsToRemove: z.array(z.number()).optional(),
  schedulesToAdd: z.array(createActivityScheduleSchema).optional(),
});

export type UploadActivityImageResponse = z.infer<typeof uploadActivityImageResponseSchema>;

export type UpdateMyActivityApiRequest = z.infer<typeof updateMyActivityApiRequestSchema>;
