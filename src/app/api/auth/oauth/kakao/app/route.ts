import { NextResponse } from 'next/server';

import { getBaseUrl } from '@/shared/api/core/url';

export const POST = async () => {
  try {
    const res = await fetch(`${getBaseUrl()}/oauth/apps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appKey: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
        provider: 'kakao',
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { message: 'Oauth app registration failed', detail: errorText },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
