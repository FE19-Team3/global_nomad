import { z } from 'zod';

export const editProfileReqSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(10, '닉네임은 최대 10자 이하여야 합니다.'),
  newPassword: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
  profileImageUrl: z.string().url('유효한 이미지 URL을 입력해주세요.').nullable(),
});

export const editProfileResSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().url().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type EditProfileRes = z.infer<typeof editProfileResSchema>;
export type EditProfileReq = z.infer<typeof editProfileReqSchema>;
