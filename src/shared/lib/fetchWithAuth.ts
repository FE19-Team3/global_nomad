import { cookies, headers } from 'next/headers';

export async function fetchWithAuth(input: string, init?: RequestInit): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // 1️⃣ accessToken으로 1차 요청
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${input}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    const headerList = await headers();
    const host = headerList.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

    const refreshRes = await fetch(`${protocol}://${host}/api/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      const { accessToken: newRefreshToken } = await refreshRes.json();

      res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${input}`, {
        ...init,
        headers: {
          ...(init?.headers || {}),
          Authorization: `Bearer ${newRefreshToken}`,
          'Content-Type': 'application/json',
        },
      });
    }
  }
  return res;
}
