import { z } from 'zod';

export const loginResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.string().email(),
    nickname: z.string(),
    profileImageUrl: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
