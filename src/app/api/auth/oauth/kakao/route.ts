import { NextRequest, NextResponse } from 'next/server';

import { getBaseUrl } from '@/shared/api/core/url';

const getRedirectPath = (_flow: string | null) => {
  return '/main';
};

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
  const cookieOptions = {
    httpOnly: true,
    secure: true,
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

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_USER_URL = 'https://kapi.kakao.com/v2/user/me';

// 카카오 닉네임 뽑아서 자동 회원가입으로 사용
const getKakaoNickname = async (code: string) => {
  const tokenParams = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? '',
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '',
    code,
  });

  const tokenRes = await fetch(KAKAO_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: tokenParams.toString(),
  });

  if (!tokenRes.ok) return null;

  const { access_token: accessToken } = await tokenRes.json();

  const userRes = await fetch(KAKAO_USER_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!userRes.ok) return null;

  const user = await userRes.json();
  return user?.kakao_account?.profile?.nickname ?? user?.properties?.nickname ?? null;
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(new URL(getErrorRedirectPath(state), req.url));
  }

  try {
    // BFF로 인가 코드 넘겨서 로그인 처리
    const res = await fetch(`${getBaseUrl()}/oauth/sign-in/kakao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: code,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      }),
    });

    if (!res.ok) {
      if (res.status === 403) {
        // 미가입이면 카카오 닉네임으로 자동 회원가입 시도
        const nickname = (await getKakaoNickname(code)) ?? 'kakao_user';
        const signUpRes = await fetch(`${getBaseUrl()}/oauth/sign-up/kakao`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nickname,
            token: code,
            redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
          }),
        });

        if (signUpRes.ok) {
          const { accessToken, refreshToken } = await signUpRes.json();
          return createAuthRedirectResponse(req, '/main', accessToken, refreshToken);
        }

        const signUpError = await signUpRes.text();

        if (signUpRes.status === 409 || signUpError.includes('이미')) {
          // 이미 가입된 케이스면 로그인 재시도
          const retrySignInRes = await fetch(`${getBaseUrl()}/oauth/sign-in/kakao`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: code,
              redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
            }),
          });

          if (retrySignInRes.ok) {
            const { accessToken, refreshToken } = await retrySignInRes.json();
            return createAuthRedirectResponse(req, '/main', accessToken, refreshToken);
          }
        }

        return NextResponse.redirect(new URL(getErrorRedirectPath(state), req.url));
      }

      await res.text();
      return NextResponse.redirect(new URL(getErrorRedirectPath(state), req.url));
    }

    const { accessToken, refreshToken } = await res.json();
    // 로그인 성공이면 쿠키 굳히고 화면 이동
    return createAuthRedirectResponse(req, getRedirectPath(state), accessToken, refreshToken);
  } catch {
    return NextResponse.redirect(new URL(getErrorRedirectPath(state), req.url));
  }
};
