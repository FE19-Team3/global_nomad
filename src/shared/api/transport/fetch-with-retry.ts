import { fetchWithTimeout } from '@/shared/api';

export type RetryConfig = {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  retryOn?: number[];
  jitter?: boolean;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
};

const DEFAULT_RETRY_CONFIG: Required<Omit<RetryConfig, 'shouldRetry'>> = {
  maxRetries: 2,
  baseDelay: 1000,
  maxDelay: 10000,
  retryOn: [408, 429, 500, 502, 503, 504],
  jitter: true,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const calculateDelay = (
  attempt: number,
  config: Required<Omit<RetryConfig, 'shouldRetry'>>,
): number => {
  let delay: number;

  delay = Math.min(config.baseDelay * (attempt + 1), config.maxDelay);

  if (config.jitter) {
    const jitterRange = delay * 0.25;
    delay = delay + (Math.random() * jitterRange * 2 - jitterRange);
  }

  return Math.floor(delay);
};

const cancelResponseBody = async (response: Response) => {
  try {
    if (response.body && !response.bodyUsed) {
      await response.body.cancel();
    }
  } catch (e) {
    console.warn('Failed to cancel response body:', e);
  }
};

export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 5000,
  retryConfig: RetryConfig = {},
): Promise<Response> => {
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };

  let lastError: unknown;
  let lastResponse: Response | undefined;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options, timeoutMs);

      if (!config.retryOn.includes(response.status)) {
        return response;
      }

      if (attempt === config.maxRetries) {
        return response;
      }

      await cancelResponseBody(response);
      lastResponse = response;

      const retryAfter = response.headers.get('Retry-After');
      const waitTime = retryAfter
        ? parseInt(retryAfter, 10) * 1000
        : calculateDelay(attempt, config);

      console.warn(
        `[Retry] ${url} 요청 실패. ${waitTime}ms 후 재시도 예정 (${attempt + 1}/${config.maxRetries})`,
      );

      await sleep(waitTime);
    } catch (e) {
      lastError = e;

      if (config.shouldRetry && !config.shouldRetry(e, attempt)) {
        throw e;
      }

      if (attempt === config.maxRetries) {
        throw e;
      }

      const waitTime = calculateDelay(attempt, config);
      console.warn(
        `[Retry] ${url} 요청 실패. ${waitTime}ms 후 재시도 예정 (${attempt + 1}/${config.maxRetries})`,
        e,
      );

      await sleep(waitTime);
    }
  }

  if (lastResponse) {
    return lastResponse;
  }

  throw lastError || new Error('재시도 실패: 알 수 없는 오류');
};
