import { TimeoutError } from '@/shared/api';
import { createApiError, isApiError } from '@/shared/api';

export const toApiError = (e: unknown) => {
  if (isApiError(e)) return e;

  if (e instanceof TimeoutError) {
    return createApiError({
      status: 504,
      message: e.message,
      details: { meta: { timeoutMs: e.timeoutMs, url: e.url } },
    });
  }

  if (e instanceof TypeError && e.message.includes('fetch')) {
    return createApiError({
      status: 502,
      message: '서버에 연결할 수 없습니다.',
    });
  }

  return createApiError({
    status: 500,
    message: '서버에서 알 수 없는 오류가 발생했습니다.',
  });
};
