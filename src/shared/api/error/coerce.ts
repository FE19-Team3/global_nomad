import type { ApiError } from '@/shared/api';
import { createApiError } from '@/shared/api';

export const coerceApiError = (input: unknown): ApiError | null => {
  if (!input || typeof input !== 'object') return null;
  const obj = input as Record<string, unknown>;

  if (typeof obj.status !== 'number') return null;
  if (typeof obj.message !== 'string') return null;

  return createApiError({
    status: obj.status,
    message: obj.message,
    ...(obj.details ? { details: obj.details } : {}),
  });
};
