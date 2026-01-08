export class TimeoutError extends Error {
  constructor(
    message: string,
    public readonly timeoutMs: number,
    public readonly url: string,
  ) {
    super(message);
    this.name = 'TimeoutError';
  }
}

const combineSignals = (signals: (AbortSignal | undefined | null)[]): AbortSignal => {
  const validSignals = signals.filter((s): s is AbortSignal => s !== undefined && s !== null);

  if ('any' in AbortSignal && typeof AbortSignal.any === 'function') {
    return AbortSignal.any(validSignals);
  }

  const controller = new AbortController();

  validSignals.forEach((signal) => {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return;
    }

    signal.addEventListener(
      'abort',
      () => {
        controller.abort(signal.reason);
      },
      { once: true },
    );
  });

  return controller.signal;
};

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 5000,
): Promise<Response> => {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => {
    timeoutController.abort(
      new TimeoutError(`요청 시간이 초과되었습니다 (${timeoutMs}ms)`, timeoutMs, url),
    );
  }, timeoutMs);

  try {
    const combinedSignal = combineSignals([options.signal, timeoutController.signal]);

    const res = await fetch(url, {
      ...options,
      signal: combinedSignal,
    });

    clearTimeout(timeoutId);
    return res;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};
