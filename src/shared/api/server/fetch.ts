import { cookies } from 'next/headers';

import {
  createApiError,
  responseToApiError,
  toApiError,
  parseJsonResponse,
  fetchWithRetry,
} from '@/shared/api';
import type { RetryConfig } from '@/shared/api';

const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
  const base = baseUrl && teamId ? `${baseUrl}/${teamId}/` : null;
  if (!base) {
    throw createApiError({
      status: 500,
      message: '서버 설정 오류: API URL이 설정되지 않았습니다.',
    });
  }

  return base;
};

const buildHeaders = (options: RequestInit, accessToken?: string) => {
  const header = new Headers(options.headers);
  if (accessToken && !header.has('Authorization')) {
    header.set('Authorization', `Bearer ${accessToken}`);
  }

  if (typeof options.body === 'string' && !header.has('Content-Type')) {
    header.set('Content-Type', 'application/json');
  }

  return header;
};

const serverFetch = async (
  path: string,
  options: RequestInit,
  timeoutMs: number,
  retryConfig: RetryConfig,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const normalizedPath = path.replace(/^\/+/, '');
  const res = await fetchWithRetry(
    `${getBaseUrl()}${normalizedPath}`,
    {
      ...options,
      headers: buildHeaders(options, accessToken),
      cache: 'no-store',
    },
    timeoutMs,
    retryConfig,
  );

  if (!res.ok) throw await responseToApiError(res);

  return res;
};

export const serverFetchJson = async <T>(
  path: string,
  options: RequestInit = {},
  timeoutMs: number = 5000,
  retryConfig: RetryConfig = {},
): Promise<T> => {
  try {
    const res = await serverFetch(path, options, timeoutMs, retryConfig);
    return await parseJsonResponse(res);
  } catch (e) {
    throw toApiError(e);
  }
};

export const serverFetchVoid = async (
  path: string,
  options: RequestInit = {},
  timeoutMs: number = 5000,
  retryConfig: RetryConfig = {},
): Promise<void> => {
  try {
    await serverFetch(path, options, timeoutMs, retryConfig);
  } catch (e) {
    throw toApiError(e);
  }
};
