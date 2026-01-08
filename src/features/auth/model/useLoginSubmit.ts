'use client';

import { useRouter } from 'next/navigation';

import { LoginFormValues } from '@/shared/schema/auth';
import { useModalStore } from '@/shared/stores/useModalStore';

export function useLoginSubmit() {
  const router = useRouter();
  const { openAlert } = useModalStore();

  return async (data: LoginFormValues) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        openAlert('로그인에 실패했습니다.');
        return;
      }

      router.push('/');
    } catch (e) {
      console.error(e); // **추후 수정** 임시에러 eslint 통과
      openAlert('네트워크 연결 상태를 확인해주세요.');
    }
  };
}
