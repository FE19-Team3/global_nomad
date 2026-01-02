import { readBody } from '@/app/api/_lib';
import type { ApiError } from '@/shared/api-error';
import { createApiError, coerceApiError } from '@/shared/api-error';

const includedRaw = process.env.NODE_ENV !== 'production';

export const responseToApiError = async (res: Response): Promise<ApiError> => {
  const status = res.status;
  const parsed = await readBody(res);

  if (parsed.kind === 'json') {
    const coerced = coerceApiError(parsed.data);
    if (coerced) {
      return createApiError({
        status,
        message: coerced.message,
        details: coerced.details,
      });
    }
  }

  return createApiError({
    status,
    message: '요청 처리 중 문제가 발생했습니다',
    details: {
      meta: {
        contentType: parsed.contentType || '없음',
        bodyKind: parsed.kind,
        raw: includedRaw && parsed.rawText.trim() ? parsed.rawText.slice(0, 2000) : undefined,
      },
    },
  });
};
