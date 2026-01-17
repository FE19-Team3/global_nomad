import { z } from 'zod';

export const noSpaces = (v: string) => v.replace(/\s/g, '');

const noSpaceString = z.preprocess((v) => (typeof v === 'string' ? noSpaces(v) : v), z.string());

export const nicknameSchema = z
  .string()
  .min(2, '닉네임은 2자 이상이어야 합니다.')
  .max(10, '닉네임은 10자 이하여야 합니다.');

export const passwordSchema = z.string().min(8, '비밀번호는 8자 이상이어야 합니다.');

export const profileEditSchema = z
  .object({
    nickname: noSpaceString.pipe(nicknameSchema),
    password: noSpaceString.pipe(passwordSchema),
    confirmPassword: noSpaceString,
    profileImageUrl: z.string().url().nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;
export type ProfileEditSubmitValues = {
  nickname: string;
  newPassword: string;
  profileImageUrl: string | null;
};
