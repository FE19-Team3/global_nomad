import { createRequestCore } from '@/shared/api/core/fetch-core';
import { fetchWithRetry } from '@/shared/api/transport';

import { buildUrl } from '../core';

export const clientApi = createRequestCore({
  resolveUrl: (path, query) => buildUrl('/api', path, query),
  fetchFn: (url, init, extras) => fetchWithRetry(url, init, extras?.timeoutMs, extras?.retryConfig),
  defaultInit: {
    credentials: 'include',
  },
  onError: (error) => {
    if (typeof window === 'undefined') return;

    if (error.status !== 401 && error.status !== 403) return;

    const currentPath = window.location.pathname;
    if (currentPath === '/login' || currentPath === '/signup') return;

    const target = error.status === 401 ? '/login?error=unauthorized' : '/login?error=forbidden';
    window.location.href = target;
  },
});
