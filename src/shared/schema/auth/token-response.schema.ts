import { z } from 'zod';

export const tokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
