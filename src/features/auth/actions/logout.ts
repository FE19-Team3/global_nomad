'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { serverApi } from '@/shared/api/server';

export async function logoutAction() {
  try {
    // 백엔드 API에 로그아웃 요청
    await serverApi.requestVoid({
      method: 'POST',
      path: '/auth/logout',
    });
  } catch (e) {
    // 에러 발생해도 쿠키는 삭제
    console.error('Logout API error:', e);
  } finally {
    // 쿠키 삭제
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
  }

  // 메인으로 리다이렉트
  redirect('/main');
}
