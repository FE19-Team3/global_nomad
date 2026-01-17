import type { ApiError } from '@/shared/api';
import { createApiError, coerceApiError } from '@/shared/api';
import { readBody } from '@/shared/api/transport';

const includedRaw = process.env.NODE_ENV !== 'production';

export const responseToApiError = async (res: Response): Promise<ApiError> => {
  const status = res.status;
  const parsed = await readBody(res);

  if (parsed.kind === 'json') {
    const coerced = coerceApiError(status, parsed.data);
    if (coerced) return coerced;
  }

  return createApiError({
    status,
    message: res.statusText,
    details: {
      meta: {
        contentType: parsed.contentType || '없음',
        bodyKind: parsed.kind,
        raw: includedRaw && parsed.rawText.trim() ? parsed.rawText.slice(0, 2000) : undefined,
      },
    },
  });
};
