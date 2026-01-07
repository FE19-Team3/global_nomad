import { cookies } from 'next/headers';

export async function fetchWithAuth(input: string, init?: RequestInit): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // 1️⃣ accessToken으로 1차 요청
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${input}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      'Content-Type': 'application/json',
    },
  });

  // 2️⃣ 정상 응답이면 그대로 반환
  if (res.status !== 401) {
    return res;
  }

  // 3️⃣ 401 → refresh 시도
  const refreshRes = await fetch('/api/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  // 4️⃣ refresh 실패 → 그대로 401 반환
  if (!refreshRes.ok) {
    return res;
  }

  // 5️⃣ refresh 성공 → 새 accessToken으로 재시도
  const newAccessToken = (await cookies()).get('accessToken')?.value;

  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${input}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: newAccessToken ? `Bearer ${newAccessToken}` : '',
      'Content-Type': 'application/json',
    },
  });
}
