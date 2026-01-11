import { ZodError } from 'zod';

import { createApiError, isApiError } from '@/shared/api';
import { TimeoutError } from '@/shared/api/transport';

const hasName = (e: unknown): e is { name: string } => {
  return (
    typeof e === 'object' &&
    e !== null &&
    'name' in e &&
    typeof (e as { name?: unknown }).name === 'string'
  );
};

const isAbortError = (e: unknown): boolean => {
  if (typeof DOMException !== 'undefined' && e instanceof DOMException) {
    return e.name === 'AbortError';
  }

  return hasName(e) && e.name === 'AbortError';
};

export const toApiError = (e: unknown) => {
  if (isApiError(e)) return e;

  if (e instanceof TimeoutError) {
    return createApiError({
      status: 504,
      message: e.message,
      details: { meta: { timeoutMs: e.timeoutMs, url: e.url } },
    });
  }

  if (e instanceof ZodError) {
    const { fieldErrors, formErrors } = e.flatten();
    return createApiError({
      status: 400,
      message: '입력값을 확인해주세요.',
      details: { fieldErrors, meta: { formErrors } },
    });
  }

  if (isAbortError(e)) {
    return createApiError({
      status: 499,
      message: '요청이 취소되었습니다.',
      details: { meta: { kind: 'abort' } },
    });
  }

  if (e instanceof TypeError) {
    return createApiError({
      status: 502,
      message: '서버에 연결할 수 없습니다.',
    });
  }

  const message = e instanceof Error ? e.message : String(e);

  return createApiError({
    status: 500,
    message: '서버에서 알 수 없는 오류가 발생했습니다.',
    details: { meta: { originalMessage: message } },
  });
};
