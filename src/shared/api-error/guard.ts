import { ERROR_CODES } from '@/shared/api-error/codes';
import type { ApiError } from '@/shared/api-error/type';

export const isApiError = (e: unknown): e is ApiError => {
  if (!e || typeof e !== 'object') return false;

  const obj = e as Record<string, unknown>;

  if (obj.name !== 'ApiError') return false;
  if (typeof obj.status !== 'number') return false;
  if (typeof obj.message !== 'string') return false;

  const code = obj.code;
  if (typeof code !== 'string') return false;
  if (!(ERROR_CODES as readonly string[]).includes(code)) return false;

  return true;
};
