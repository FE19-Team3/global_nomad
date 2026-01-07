import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    // 클라이언트(LoginForm)에서 보낸 데이터 추출 (email, password)
    const body = await req.json();

    // 외부 Auth API 호출
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // **추후 수정** ApiError 규격으로 매핑
      return NextResponse.json({ message: 'Login failed' }, { status: res.status });
    }

    const { accessToken, refreshToken } = await res.json();

    // HttpOnly Cookie 설정
    // cookies() 함수를 호출하면 현재 요청(Request)에 포함된 쿠키들을 읽거나, 응답(Response)에 보낼 새로운 쿠키를 설정할 수 있는 **객체(Store)**를 반환합니다
    const response = NextResponse.json({ success: true }, { status: 200 });

    // Access Token 설정
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax', //기본 보안
      path: '/',
      maxAge: 60 * 60, // 1시간
    });

    // Refresh Token 설정
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax', //기본 보안
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return response;
  } catch {
    // **추후 수정** ApiError 공통 처리
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
