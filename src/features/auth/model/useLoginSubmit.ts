'use client';

import { useRouter } from 'next/navigation';

import { isApiError } from '@/shared/api';
import { LoginFormValues } from '@/shared/schema/auth';
import { useModalStore } from '@/shared/stores/useModalStore';

export function useLoginSubmit() {
  const router = useRouter();
  const { openAlert } = useModalStore();

  return async (data: LoginFormValues) => {
    try {
      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      router.push('/');
    } catch (e) {
      if (isApiError(e)) {
        openAlert(e.message);
      }
    }
  };
}
