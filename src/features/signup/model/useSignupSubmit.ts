'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { isApiError } from '@/shared/api';
import { clientApi } from '@/shared/api/client';
import { SignupRequest, SignupResponse } from '@/shared/schema/auth';
import { useModalStore } from '@/shared/stores/useModalStore';

const signup = async (data: SignupRequest) => {
  return clientApi.post({
    path: 'users',
    body: data,
    schema: SignupResponse,
  });
};

export function useSignupSubmit() {
  const router = useRouter();
  const { openAlert } = useModalStore();
  const mutation = useMutation({
    mutationFn: signup,
    retry: false,
    onSuccess: () => {
      openAlert({
        message: '회원가입이 완료되었습니다.',
        onClose: () => {
          router.push('/login');
        },
      });
    },
    onError: (e) => {
      if (!isApiError(e)) {
        openAlert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        return;
      }

      if (e.status === 409) {
        openAlert('이미 사용 중인 이메일입니다.');
        return;
      }

      if (e.status === 0 || e.status >= 500) {
        openAlert('요청에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        return;
      }

      openAlert(e.message);
    },
  });

  return (data: SignupRequest) => {
    if (mutation.isPending) return;

    const { ...request } = data;
    mutation.mutate(request);
  };
}
