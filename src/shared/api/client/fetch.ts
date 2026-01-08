import { createRequestCore } from '@/shared/api/core/fetch-core';
import { fetchWithRetry } from '@/shared/api/transport';

import { buildUrl } from '../core';

export const clientApi = createRequestCore({
  resolveUrl: buildUrl,
  fetchFn: (url, init, extras) => fetchWithRetry(url, init, extras?.timeoutMs, extras?.retryConfig),

  defaultInit: {
    credentials: 'include',
  },
});
