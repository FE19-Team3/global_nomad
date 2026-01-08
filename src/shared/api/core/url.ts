import { createApiError } from '@/shared/api';

export type Query = Record<string, string | number>;

export const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

  if (!baseUrl || !teamId) {
    throw createApiError({
      status: 500,
      message: '환경 변수 누락: BASE_URL 또는 TEAM_ID가 설정되지 않았습니다.',
    });
  }

  return `${baseUrl}/${teamId}`;
};

export const buildUrl = (base: string, path: string, query?: Query) => {
  let url = base.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');

  if (query && Object.keys(query).length > 0) {
    const search = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      search.append(key, String(value));
    }

    url += `?${search.toString()}`;
  }

  return url;
};
