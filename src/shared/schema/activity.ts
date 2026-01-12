import { z } from 'zod';

import { toMinutes } from '@/shared/lib/time';

const timePattern = /^\d{2}:\d{2}$/;

export const createActivityScheduleSchema = z
  .object({
    date: z.string().min(1, '날짜를 선택해 주세요.'),
    startTime: z.string().regex(timePattern, '시작 시간을 선택해 주세요.'),
    endTime: z.string().regex(timePattern, '종료 시간을 선택해 주세요.'),
  })
  .refine(
    (value) => {
      const startMinutes = toMinutes(value.startTime);
      const endMinutes = toMinutes(value.endTime);
      if (startMinutes === null || endMinutes === null) return false;
      return endMinutes > startMinutes;
    },
    {
      path: ['endTime'],
      message: '종료 시간이 시작 시간보다 늦어야 합니다.',
    },
  );

export const createActivityApiRequestSchema = z.object({
  title: z.string().min(1, '제목을 입력해 주세요.'),
  category: z.string().min(1, '카테고리를 선택해 주세요.'),
  description: z.string().min(1, '설명을 입력해 주세요.'),
  price: z
    .string()
    .min(1, '가격을 입력해 주세요.')
    .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, {
      message: '가격은 0보다 큰 숫자만 입력해 주세요.',
    }),
  address: z.string().min(1, '주소를 입력해 주세요.'),
  schedules: z.array(createActivityScheduleSchema).min(1, '예약 시간을 1개 이상 추가해 주세요.'),
  bannerImageUrl: z.string().url().or(z.literal('')).optional(),
  subImageUrls: z.array(z.string().url()).optional(),
});

export type CreateActivityFormValues = z.infer<typeof createActivityApiRequestSchema>;

const ActivityScheduleTimeSchema = z.object({
  id: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

const ActivityScheduleSchema = z.object({
  date: z.string(),
  times: z.array(ActivityScheduleTimeSchema),
});

const ActivitySubImageSchema = z.object({
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
  subImages: z.array(ActivitySubImageSchema),
  schedules: z.array(ActivityScheduleSchema),
});

export type CreateActivityApiResponse = z.infer<typeof createActivityApiResponseSchema>;
