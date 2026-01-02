import type { ZodType } from 'zod';

import { parseJsonResponse, toApiError, responseToApiError } from '@/app/api/_lib';

type ClientFetchOptions<T> = RequestInit & {
  schema?: ZodType<T>;
};

const buildHeaders = (options: RequestInit) => {
  const headers = new Headers(options.headers);

  if (typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return headers;
};

export const clientFetchJson = async <T>(
  path: string,
  options: ClientFetchOptions<T> = {},
): Promise<T> => {
  try {
    const res = await fetch(path, {
      ...options,
      headers: buildHeaders(options),
      credentials: options.credentials ?? 'include',
      cache: options.cache ?? 'no-store',
    });

    if (!res.ok) throw await responseToApiError(res);

    return await parseJsonResponse(res, { schema: options.schema });
  } catch (e) {
    throw toApiError(e);
  }
};

export const clientFetchVoid = async (path: string, options: RequestInit = {}): Promise<void> => {
  try {
    const res = await fetch(path, {
      ...options,
      headers: buildHeaders(options),
      credentials: options.credentials ?? 'include',
      cache: options.cache ?? 'no-store',
    });

    if (!res.ok) throw await responseToApiError(res);
  } catch (e) {
    throw toApiError(e);
  }
};
