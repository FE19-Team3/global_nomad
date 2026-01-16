import { z } from 'zod';

export const userMeResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserMeResponse = z.infer<typeof userMeResponseSchema>;
