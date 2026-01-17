'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { isApiError } from '@/shared/api';
import { LoginFormValues } from '@/shared/schema/auth';
import { useModalStore } from '@/shared/stores/useModalStore';

export function useLoginSubmit() {
  const router = useRouter();
  const { openAlert } = useModalStore();
  const queryClient = useQueryClient();

  return async (data: LoginFormValues) => {
    try {
      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // 로그인 성공 후 유저 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });

      router.push('/');
    } catch (e) {
      if (isApiError(e)) {
        openAlert(e.message);
      }
    }
  };
}
