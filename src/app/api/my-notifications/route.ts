import { NextResponse } from 'next/server';

import { NotificationApiResponseSchema } from '@/entities/notification/model/schema';
import { serverApi } from '@/shared/api/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const cursorId = searchParams.get('cursorId');
  const size = searchParams.get('size');

  const query: Record<string, number> = {};

  if (cursorId !== null) query.cursorId = Number(cursorId);
  if (size !== null) query.size = Number(size);

  const { data, status } = await serverApi.get({
    path: '/notifications',
    query,
    schema: NotificationApiResponseSchema,
  });

  return NextResponse.json(data, { status });
}
