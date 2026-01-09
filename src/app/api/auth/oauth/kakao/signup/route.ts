import { NextRequest, NextResponse } from 'next/server';

import { getBaseUrl } from '@/shared/api/core/url';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const res = await fetch(`${getBaseUrl()}/oauth/sign-up/kakao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Oauth signup failed' }, { status: res.status });
    }

    const { accessToken, refreshToken } = await res.json();
    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
