import 'server-only';
import { cookies, headers } from 'next/headers';

import { createRequestCore } from '@/shared/api/core/fetch-core';
import { fetchWithRetry } from '@/shared/api/transport';

import { buildUrl, getBaseUrl } from '../core';

export const serverApi = createRequestCore({
  resolveUrl: (path, query) => buildUrl(getBaseUrl(), path, query),
  fetchFn: async (url, init, extras) => {
    // 1차 요청
    let response = await fetchWithRetry(url, init, extras?.timeoutMs, extras?.retryConfig);

    // 401 에러 - 토큰 갱신 시도
    if (response.status === 401) {
      const headerList = await headers();
      const host = headerList.get('host');
      const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

      const refreshRes = await fetch(`${protocol}://${host}/api/auth/tokens`, {
        method: 'POST',
        credentials: 'include',
      });

      // 갱신 성공 - 원래 요청 재시도
      if (refreshRes.ok) {
        response = await fetchWithRetry(url, init, extras?.timeoutMs, extras?.retryConfig);
      }
    }

    return response;
  },

  getAccessToken: async () => {
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value;
  },
});
