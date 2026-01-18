// shared/lib/refreshToken.ts (새 파일)
import { cookies } from 'next/headers';

import { serverApi } from '@/shared/api/server';
import { tokenResponseSchema } from '@/shared/schema/auth/token-response.schema';

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
  } catch {
    return false;
  }
};
