// shared/lib/refreshToken.ts (새 파일)
import { cookies } from 'next/headers';

import { serverApi } from '@/shared/api/server';
import { tokenResponseSchema } from '@/shared/schema/auth/token-response.schema';

import { isApiError } from '../api';

export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) return false;

    const {
      data: { accessToken, refreshToken: newRefreshToken },
    } = await serverApi.post({
      path: '/auth/tokens',
      init: { headers: { Authorization: `Bearer ${refreshToken}` } },
      schema: tokenResponseSchema,
      skipUnauthorizedRetry: true,
    });

    const isSecure = process.env.NODE_ENV === 'production';

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
    });

    if (newRefreshToken) {
      cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'lax',
        path: '/',
      });
    }

    return true;
  } catch (e) {
    if (isApiError(e)) {
      console.error('토큰 재발급 중 에러 발생:', e.message);
    }
    return false;
  }
};
