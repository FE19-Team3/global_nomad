import type { ApiError } from '@/shared/api-error';
import { createApiError, coerceApiError } from '@/shared/api-error';

export const mapUpstreamError = async (res: Response): Promise<ApiError> => {
  const status = res.status;
  const body = await res.json().catch(() => null);

  const coerced = coerceApiError(body);

  if (coerced) {
    return createApiError({
      status,
      message: coerced.message,
      details: coerced.details ? coerced.details : {},
    });
  }

  return createApiError({
    status,
    message: '요청 처리 중 문제가 발생했습니다.',
    details: { meta: { upstreamStatus: status } },
  });
};
