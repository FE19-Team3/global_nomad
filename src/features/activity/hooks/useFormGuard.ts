'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useModalStore } from '@/shared/stores/useModalStore';

export const useFormGuard = (isDirty: boolean) => {
  const { openConfirm } = useModalStore();
  const router = useRouter();
  const allowLeaveRef = useRef(false);
  const hasGuardRef = useRef(false);

  useEffect(() => {
    if (!isDirty || hasGuardRef.current) return;
    const pushGuard = () => {
      window.history.pushState({ guard: true }, '', window.location.href);
      hasGuardRef.current = true;
    };
    pushGuard();
  }, [isDirty]);

  useEffect(() => {
    const handlePopState = () => {
      if (!isDirty || allowLeaveRef.current) return;

      openConfirm({
        message: '저장되지 않았습니다. 정말 뒤로 가시겠습니까?',
        onConfirm: () => {
          allowLeaveRef.current = true;
          router.back();
        },
      });

      window.history.pushState({ guard: true }, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isDirty, openConfirm, router]);
};
