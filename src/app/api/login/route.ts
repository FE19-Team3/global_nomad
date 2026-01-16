import { NextRequest, NextResponse } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { loginRequestSchema } from '@/shared/schema/auth/login-request.schema';
import { loginResponseSchema } from '@/shared/schema/auth/login-response.schema';

export const POST = async (req: NextRequest) => {
  try {
    // 요청 body 파싱 + 검증
    const body = loginRequestSchema.parse(await req.json());
    console.log('[LOGIN BODY]', body);

    // Auth 서버 로그인 요청
    const {
      data: { accessToken, refreshToken },
    } = await serverApi.post({
      path: '/auth/login',
      body,
      schema: loginResponseSchema,
    });

    // 응답 생성 (쿠키 설정을 위해 NextResponse 사용)
    const response = NextResponse.json({ success: true });

    const isSecure = process.env.NODE_ENV === 'production';

    // Access Token 쿠키 설정
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    // Refresh Token 쿠키 설정
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    // 정상 종료
    return response;
  } catch (e) {
    // 모든 에러는 공통 ApiError 흐름으로 종료
    return respondError(toApiError(e));
  }
};
