import { z } from 'zod';

// 상태 집계용 스키마
export const CountByStatus = z
  .object({
    pending: z.number(),
    confirmed: z.number(),
    completed: z.number(),
  })
  .partial();
