import { createApiError } from '@/shared/api-error';

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 5000,
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } catch (error) {
    clearTimeout(timeoutId);

    // AbortError = 타임아웃
    if (error instanceof Error && error.name === 'AbortError') {
      throw createApiError({
        status: 504,
        message: '요청 시간이 초과되었습니다.',
        details: {
          meta: {
            timeoutMs,
            url,
          },
        },
      });
    }

    // 다른 에러는 그대로 throw
    throw error;
  }
};
