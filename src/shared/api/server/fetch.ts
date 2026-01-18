import 'server-only';
import { cookies } from 'next/headers';

import { createRequestCore } from '@/shared/api/core/fetch-core';
import { fetchWithRetry } from '@/shared/api/transport';
import { refreshAccessToken } from '@/shared/lib/refreshToken';

import { buildUrl, getBaseUrl } from '../core';

export const serverApi = createRequestCore({
  resolveUrl: (path, query) => buildUrl(getBaseUrl(), path, query),
  fetchFn: (url, init, extras) => fetchWithRetry(url, init, extras?.timeoutMs, extras?.retryConfig),

  getAccessToken: async () => {
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value;
  },
  handleUnauthorized: refreshAccessToken,
});
