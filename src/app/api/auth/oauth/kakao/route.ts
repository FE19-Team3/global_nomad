import { NextRequest, NextResponse } from 'next/server';

import { getBaseUrl } from '@/shared/api/core/url';

const getErrorRedirectPath = (flow: string | null) => {
  if (flow === 'signup') return '/signup?error=oauth';
  return '/login?error=oauth';
};

const createAuthRedirectResponse = (
  req: NextRequest,
  redirectPath: string,
  accessToken: string,
  refreshToken: string,
) => {
  const response = NextResponse.redirect(new URL(redirectPath, req.url));
  const isSecure = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax' as const,
    path: '/',
  };

  response.cookies.set('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 60 * 60,
  });

  response.cookies.set('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(new URL(getErrorRedirectPath(state), req.url));
  }

  try {
    if (state === 'signup') {
      const signUpRes = await fetch(`${getBaseUrl()}/oauth/sign-up/kakao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: `user_${Date.now()}`,
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        }),
      });

      if (signUpRes.ok) {
        const { accessToken, refreshToken } = await signUpRes.json();
        return createAuthRedirectResponse(req, '/main', accessToken, refreshToken);
      }

      if (signUpRes.status === 409) {
        return NextResponse.redirect(new URL('/login?error=already_registered', req.url));
      }

      return NextResponse.redirect(new URL('/signup?error=oauth', req.url));
    }

    const signInRes = await fetch(`${getBaseUrl()}/oauth/sign-in/kakao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: code,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      }),
    });

    if (signInRes.ok) {
      const { accessToken, refreshToken } = await signInRes.json();
      return createAuthRedirectResponse(req, '/main', accessToken, refreshToken);
    }

    if (signInRes.status === 403) {
      return NextResponse.redirect(new URL('/signup?error=not_registered', req.url));
    }

    return NextResponse.redirect(new URL('/login?error=oauth', req.url));
  } catch {
    return NextResponse.redirect(new URL(getErrorRedirectPath(state), req.url));
  }
};
