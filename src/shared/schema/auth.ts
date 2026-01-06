import { z } from 'zod';

import { OauthProviderEnum } from '@/shared/schema/enums';
import { Url, NonEmptyString } from '@/shared/schema/primitives';

export const Email = z.string().email();

export const Password = z.string().min(8);

export const Nickname = NonEmptyString;

export const OauthToken = z.union([
  // JWT
  z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, 'JWT 형식이 아님'),
  // 일반 인가 코드
  z.string().min(10, '인가 코드가 너무 짧습니다.'),
]);

export const RedirectUri = Url;

export const OauthProvider = OauthProviderEnum;
