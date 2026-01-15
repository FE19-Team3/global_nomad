import { NextRequest } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { myActivitiesApiResponseSchema } from '@/shared/schema/activity';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const cursorIdParam = searchParams.get('cursorId');
    const sizeParam = searchParams.get('size');

    const cursorId = cursorIdParam ? Number(cursorIdParam) : undefined;
    const size = sizeParam ? Number(sizeParam) : undefined;

    const response = await serverApi.get({
      path: '/my-activities',
      query: {
        ...(cursorId !== undefined ? { cursorId } : {}),
        ...(size !== undefined ? { size } : {}),
      },
      schema: myActivitiesApiResponseSchema,
      retryConfig: {
        maxRetries: 0,
        retryOn: [],
      },
    });

    return Response.json(response.data, { status: 200 });
  } catch (e) {
    return respondError(toApiError(e));
  }
}
