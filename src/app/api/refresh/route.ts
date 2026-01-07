import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken');

    if (!refreshToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken.value}`,
      },
    });

    if (!res.ok) {
      // 재발급 실패 → 로그아웃
      const response = NextResponse.json({ message: 'Refresh failed' }, { status: 401 });

      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }

    const { accessToken, refreshToken: newRefreshToken } = await res.json();

    const response = NextResponse.json({
      success: true,
      accessToken: newRefreshToken,
    });

    // access token 갱신
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, //1시간
    });

    // refresh token이 새로 오면 교체 (rotation)
    if (newRefreshToken) {
      response.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, //7일
      });
    }

    return response;
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
