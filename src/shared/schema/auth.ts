import { z } from 'zod';

import { OauthProviderEnumSchema } from '@/shared/schema/enums';
import { Url } from '@/shared/schema/primitives';

export const Email = z
  .string()
  .min(1, '이메일을 입력해 주세요.')
  .email('이메일 형식이 올바르지 않습니다.');

export const Nickname = z
  .string()
  .trim() // 공백 방지
  .min(1, '닉네임을 입력해 주세요.')
  .max(20, '닉네임은 20자 이내로 입력해주세요.');

export const Password = z
  .string()
  .trim()
  .min(1, '비밀번호를 입력해 주세요.')
  .min(8, '비밀번호는 8자 이상이어야 합니다.');

export const PasswordConfirm = z.string().min(1, '비밀번호 확인을 입력해 주세요.');

export const LoginSchema = z.object({
  email: Email,
  password: Password,
});

// 객체를 “어떻게 보겠다”는 타입 설명서
export type LoginFormValues = z.infer<typeof LoginSchema>;

// ========== SIGN UP ==========
export const SignupSchema = z
  .object({
    nickname: Nickname,
    email: Email,
    password: Password,
    passwordConfirm: PasswordConfirm,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupFormValues = z.infer<typeof SignupSchema>;

export const SignupResponse = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const SignupRequestSchema = z.object({
  email: z.string().email(),
  nickname: z.string().min(1).max(20),
  password: z.string().min(8),
});
export type SignupRequest = z.infer<typeof SignupRequestSchema>;
// ========== SIGN UP ==========

export const OauthToken = z.union([
  // JWT
  z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, 'JWT 형식이 아님'),
  // 일반 인가 코드
  z.string().min(10, '인가 코드가 너무 짧습니다.'),
]);

export const RedirectUri = Url;

export const OauthProvider = OauthProviderEnumSchema;
