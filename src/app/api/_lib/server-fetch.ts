import { cookies } from 'next/headers';

import { createApiError } from '@/shared/api-error';

import { mapUpstreamError } from './error-mapper';
import { toApiError } from './to-api-error';

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

    if (!res.ok) throw await mapUpstreamError(res);

    if (res.status === 204) {
      throw createApiError({
        status: 500,
        message: '응답 컨텐츠 형식이 올바르지 않습니다.',
      });
    }

    const contentType = res.headers.get('Content-Type') ?? '';
    if (!contentType.includes('application/json')) {
      throw createApiError({
        status: 500,
        message: '응답 컨텐츠 형식이 올바르지 않습니다.',
      });
    }

    return (await res.json()) as T;
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

    if (!res.ok) throw await mapUpstreamError(res);

    return;
  } catch (e) {
    throw toApiError(e);
  }
};
