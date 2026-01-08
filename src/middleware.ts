import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/my-activities'];
const AUTH_ROUTES = ['/login', '/signup'];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // 로그인 안 한 상태 + 보호 페이지 접근
  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 로그인 한 상태 + 로그인, 회원가입 페이지 접근
  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

//**추후 수정** 지정한 경로 미들웨어 차단
export const config = {
  matcher: ['/my-activities/:path*', '/login', '/signup'],
};
