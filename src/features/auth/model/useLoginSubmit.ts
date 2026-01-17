'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { isApiError, respondError, toApiError } from '@/shared/api';
import { clientApi } from '@/shared/api/client';
import { LoginFormValues } from '@/shared/schema/auth';
import { userMeResponseSchema } from '@/shared/schema/user/user-me-response.schema';
import { useModalStore } from '@/shared/stores/useModalStore';

export function useLoginSubmit() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openAlert } = useModalStore();

  return async (data: LoginFormValues) => {
    try {
      // 로그인 (쿠키 설정)
      await clientApi.requestVoid({
        method: 'POST',
        path: '/login',
        body: data,
      });

      // 로그인 직후 유저 정보 조회
      try {
        const { data: user } = await clientApi.get({
          path: '/users/me',
          schema: userMeResponseSchema,
        });

        // auth 캐시 즉시 주입
        queryClient.setQueryData(['auth', 'user'], user);
      } catch {
        queryClient.setQueryData(['auth', 'user'], null);
      }

      router.push('/');
    } catch (err) {
      if (isApiError(err)) {
        openAlert(err.message);
      }
      return respondError(toApiError(err));
    }
  };
}
