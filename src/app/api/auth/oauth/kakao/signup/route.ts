import { NextRequest, NextResponse } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { OauthKakaoSignupRequestSchema, OauthSignupResponseSchema } from '@/shared/schema/auth';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = OauthKakaoSignupRequestSchema.parse(body);

    const { data } = await serverApi.post({
      path: '/oauth/sign-up/kakao',
      body: parsed,
      schema: OauthSignupResponseSchema,
      retryConfig: {
        maxRetries: 0,
        retryOn: [],
      },
    });
    const { accessToken, refreshToken } = data;

    const response = NextResponse.json({ success: true }, { status: 200 });
    const isSecure = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax' as const,
      path: '/',
    };

    response.cookies.set('accessToken', accessToken, cookieOptions);
    response.cookies.set('refreshToken', refreshToken, cookieOptions);

    return response;
  } catch (e) {
    return respondError(toApiError(e));
  }
};
