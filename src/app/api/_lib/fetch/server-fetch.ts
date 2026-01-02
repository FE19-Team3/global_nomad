import { cookies } from 'next/headers';

import { responseToApiError, toApiError, parseJsonResponse } from '@/app/api/_lib';
import { createApiError } from '@/shared/api-error';

const getBaseUrl = () => {
  const base = process.env.UPSTREAM_BASE_URL;
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

export const serverFetchJson = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      ...options,
      headers: buildHeaders(options, accessToken),
      cache: 'no-store',
    });

    if (!res.ok) throw await responseToApiError(res);

    return await parseJsonResponse(res);
  } catch (e) {
    throw toApiError(e);
  }
};

export const serverFetchVoid = async (path: string, options: RequestInit = {}): Promise<void> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      ...options,
      headers: buildHeaders(options, accessToken),
      cache: 'no-store',
    });

    if (!res.ok) throw await responseToApiError(res);

    return;
  } catch (e) {
    throw toApiError(e);
  }
};
