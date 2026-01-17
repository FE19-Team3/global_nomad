import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { tokenResponseSchema } from '@/shared/schema/auth/token-response.schema';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    // refreshToken 자체가 없으면 → 비로그인 상태
    if (!refreshToken) {
      throw new Error('Unauthorized');
    }

    // 토큰 재발급 요청
    // 실패 시 serverApi 내부에서 ApiError throw
    const {
      data: { accessToken, refreshToken: newRefreshToken },
    } = await serverApi.post({
      path: '/auth/tokens',
      init: {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
      schema: tokenResponseSchema,
    });

    const response = NextResponse.json({ accessToken, refreshToken: newRefreshToken });
    const isSecure = process.env.NODE_ENV === 'production';

    // accessToken 갱신
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    // refreshToken rotation (있을 때만 교체)
    if (newRefreshToken) {
      response.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (e) {
    // 재발급 실패 → 로그아웃
    // (refresh 만료 / 위조 / 서버 거부 등)
    // 쿠키 삭제가 필요한 경우 NextResponse를 직접 생성
    const errorResponse = NextResponse.json(respondError(toApiError(e)).body, {
      status: respondError(toApiError(e)).status,
    });

    // 재발급 실패 → 로그아웃
    errorResponse.cookies.delete('accessToken');
    errorResponse.cookies.delete('refreshToken');

    return errorResponse;
  }
}
