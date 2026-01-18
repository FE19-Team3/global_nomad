import { parseJsonResponse, responseToApiError, toApiError, type SchemaParser } from '@/shared/api';
import { type RetryConfig } from '@/shared/api/transport';

import { buildHeaders } from './headers';
import { type Query } from './url';

type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH';
type Body = unknown | FormData | string;

export type BaseOptions = {
  path: string;
  query?: Query;
  body?: Body;
  init?: Omit<RequestInit, 'body' | 'method'>;
  timeoutMs?: number;
  retryConfig?: RetryConfig;
  skipUnauthorizedRetry?: boolean;
};

type RequestCoreOption = BaseOptions & {
  method: Method;
};

type CommonArgs = BaseOptions;

type RequestJsonWithSchema<T> = RequestCoreOption & { schema: SchemaParser<T> };
type RequestJsonWithoutSchema = RequestCoreOption & { schema?: undefined };

type ResponseType<T> = {
  data: T;
  status: number;
  headers: Headers;
};

export type RequesterEnv = {
  resolveUrl: (path: string, query?: Query) => string;
  getAccessToken?: () => Promise<string | undefined>;
  handleUnauthorized?: () => Promise<boolean>;
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
    skipUnauthorizedRetry,
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

    let res = await env.fetchFn(url, mergedInit, { timeoutMs, retryConfig });

    if (res.status === 401 && !skipUnauthorizedRetry && env.handleUnauthorized) {
      const isRefreshed = await env.handleUnauthorized();
      if (isRefreshed) {
        const newAccessToken = await env.getAccessToken?.();
        mergedInit.headers = buildHeaders(mergedInit, newAccessToken);
        res = await env.fetchFn(url, mergedInit, { timeoutMs, retryConfig });
      }
    }

    if (!res.ok) throw await responseToApiError(res);
    return res;
  };

  async function requestJson<T>(options: RequestJsonWithSchema<T>): Promise<ResponseType<T>>;
  async function requestJson(options: RequestJsonWithoutSchema): Promise<ResponseType<unknown>>;

  async function requestJson<T>(
    options: RequestCoreOption & { schema?: SchemaParser<T> },
  ): Promise<ResponseType<T> | ResponseType<unknown>> {
    try {
      const res = await requestRaw(options);
      const data = await parseJsonResponse(res, { schema: options.schema });
      return { data, status: res.status, headers: res.headers };
    } catch (e) {
      throw toApiError(e);
    }
  }

  const requestVoid = async (options: RequestCoreOption): Promise<void> => {
    try {
      await requestRaw(options);
    } catch (e) {
      throw toApiError(e);
    }
  };

  const get = <T>(options: CommonArgs & { schema: SchemaParser<T> }): Promise<ResponseType<T>> =>
    requestJson<T>({ ...options, method: 'GET' });

  const post = <T>(options: CommonArgs & { schema: SchemaParser<T> }): Promise<ResponseType<T>> =>
    requestJson<T>({ ...options, method: 'POST' });

  const patch = <T>(options: CommonArgs & { schema: SchemaParser<T> }): Promise<ResponseType<T>> =>
    requestJson<T>({ ...options, method: 'PATCH' });

  const del = (options: CommonArgs): Promise<void> => requestVoid({ ...options, method: 'DELETE' });

  const upload = <T>(
    options: CommonArgs & { body: FormData; schema: SchemaParser<T> },
  ): Promise<ResponseType<T>> => requestJson<T>({ ...options, method: 'POST' });

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
