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
  year: z.coerce.number().min(1970).max(2100),
  month: z.coerce.number().min(1).max(12),
});

export const KeywordQuery = z.object({
  keyword: z.string().optional(),
});

export const MethodQuery = z.object({
  method: MethodEnum,
});
