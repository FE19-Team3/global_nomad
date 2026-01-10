import type { ZodType } from 'zod';

import { parseJsonResponse, responseToApiError, toApiError } from '@/shared/api';
import { type RetryConfig } from '@/shared/api/transport';

import { buildHeaders } from './headers';
import { type Query } from './url';

type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH';
type Body = unknown | FormData | string;

type BaseOptions = {
  path: string;
  query?: Query;
  body?: Body;
  init?: Omit<RequestInit, 'body' | 'method'>;
  timeoutMs?: number;
  retryConfig?: RetryConfig;
};

type RequestCoreOption = BaseOptions & {
  method: Method;
};

type CommonArgs = BaseOptions;

type RequestJsonWithSchema<T> = RequestCoreOption & { schema: ZodType<T> };
type RequestJsonWithoutSchema = RequestCoreOption & { schema?: undefined };

export type RequesterEnv = {
  resolveUrl: (path: string, query?: Query) => string;
  getAccessToken?: () => Promise<string | undefined>;
  fetchFn: (
    url: string,
    init: RequestInit,
    extras?: { timeoutMs?: number; retryConfig?: RetryConfig },
  ) => Promise<Response>;
  defaultInit?: RequestInit;
};

export const createRequestCore = (env: RequesterEnv) => {
  const requestRaw = async ({
    method,
    path,
    query,
    init,
    body,
    timeoutMs,
    retryConfig,
  }: RequestCoreOption): Promise<Response> => {
    const url = env.resolveUrl(path, query);
    const accessToken = env.getAccessToken ? await env.getAccessToken() : undefined;

    const mergedInit: RequestInit = {
      ...(env.defaultInit ?? {}),
      ...(init ?? {}),
      method,
    };

    if (body !== undefined && method !== 'GET' && method !== 'DELETE') {
      mergedInit.body =
        body instanceof FormData || typeof body === 'string' ? body : JSON.stringify(body);
    }

    mergedInit.headers = buildHeaders(mergedInit, accessToken);

    const res = await env.fetchFn(url, mergedInit, { timeoutMs, retryConfig });

    if (!res.ok) throw await responseToApiError(res);
    return res;
  };

  async function requestJson<T>(options: RequestJsonWithSchema<T>): Promise<T>;
  async function requestJson(options: RequestJsonWithoutSchema): Promise<unknown>;

  async function requestJson<T>(
    options: RequestCoreOption & { schema?: ZodType<T> },
  ): Promise<T | unknown> {
    try {
      const res = await requestRaw(options);
      return await parseJsonResponse(res, { schema: options.schema });
    } catch (e) {
      const apiError = toApiError(e);
      throw apiError;
    }
  }

  const requestVoid = async (options: RequestCoreOption): Promise<void> => {
    try {
      await requestRaw(options);
    } catch (e) {
      const apiError = toApiError(e);
      throw apiError;
    }
  };

  const get = <T>(options: CommonArgs & { schema: ZodType<T> }): Promise<T> =>
    requestJson<T>({ ...options, method: 'GET' });

  const post = <T>(options: CommonArgs & { schema: ZodType<T> }): Promise<T> =>
    requestJson<T>({ ...options, method: 'POST' });

  const patch = <T>(options: CommonArgs & { schema: ZodType<T> }): Promise<T> =>
    requestJson<T>({ ...options, method: 'PATCH' });

  const del = (options: CommonArgs): Promise<void> => requestVoid({ ...options, method: 'DELETE' });

  const upload = <T>(options: CommonArgs & { body: FormData; schema: ZodType<T> }): Promise<T> =>
    requestJson<T>({ ...options, method: 'POST' });

  return {
    requestJson,
    requestVoid,
    get,
    post,
    patch,
    del,
    upload,
  };
};
