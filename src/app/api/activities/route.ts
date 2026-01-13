import { NextRequest } from 'next/server';

import { createActivityApiResponseSchema } from '@/entities/activity';
import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { createActivityApiRequestSchema } from '@/shared/schema/activity';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = createActivityApiRequestSchema.parse(data);

    const response = await serverApi.post({
      path: '/activities',
      body: {
        ...parsed,
        price: Number(parsed.price),
      },
      schema: createActivityApiResponseSchema,
      retryConfig: {
        maxRetries: 0,
        retryOn: [],
      },
    });

    return Response.json(response, { status: 201 });
  } catch (e) {
    return respondError(toApiError(e));
  }
}
