import { NextResponse } from 'next/server';

import { fetchWithAuth } from '@/shared/lib/fetchWithAuth';

export const GET = async () => {
  try {
    const res = await fetchWithAuth('/users/me', {
      method: 'GET',
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: res.status });
    }

    const user = await res.json();
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
