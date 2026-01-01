import { z } from 'zod';

import { MethodEnum } from '@/shared/schema/enums';

export const PageQuery = z.object({
  page: z.number().default(1),
  size: z.number().default(20),
});

export const CursorQuery = z.object({
  cursor: z.number().optional(),
  size: z.number().default(20),
});

export const YearMonthQuery = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, '연도는 4자리 숫자여야 합니다.')
    .refine((y) => Number(y) >= 1900 && Number(y) <= 2100, {
      message: '연도는 1900~2100 사이여야 합니다.',
    }),
  month: z.string().regex(/^(0[1-9]|1[0-2])$/, '월은 01~12 사이여야 합니다.'),
});

export const KeywordQuery = z.object({
  keyword: z.string().optional(),
});

export const MethodQuery = z.object({
  method: MethodEnum,
});
