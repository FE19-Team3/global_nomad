import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;

  // 로그인 안 한 상태 + 보호 페이지 접근
  if (!accessToken && pathname.startsWith('/my-activities')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 로그인 한 상태 + 로그인, 회원가입 페이지 접근
  if (accessToken && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

//**추후 수정** 지정한 경로 미들웨어 차단
export const config = {
  matcher: ['/my-activites', '/login', '/signup'],
};
