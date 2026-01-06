import { z } from 'zod';

import { OauthProviderEnum } from '@/shared/schema/enums';
import { Url, NonEmptyString } from '@/shared/schema/primitives';

export const Email = z
  .string()
  .min(1, '이메일을 입력해 주세요.')
  .email('이메일 형식이 올바르지 않습니다.');

export const Password = z
  .string()
  .min(1, '비밀번호를 입력해 주세요.')
  .min(8, '비밀번호는 8자 이상이어야 합니다.');

export const Nickname = NonEmptyString;

export const LoginSchema = z.object({
  email: Email,
  password: Password,
});

export type LoginFormValues = z.infer<typeof LoginSchema>;

export const OauthToken = z.union([
  // JWT
  z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, 'JWT 형식이 아님'),
  // 일반 인가 코드
  z.string().min(10, '인가 코드가 너무 짧습니다.'),
]);

export const RedirectUri = Url;

export const OauthProvider = OauthProviderEnum;
