import { NextRequest } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { SignupResponse, SignupRequestSchema } from '@/shared/schema/auth';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const parsed = SignupRequestSchema.parse(data);

    const safeData = await serverApi.post({
      path: '/users',
      body: parsed,
      schema: SignupResponse,
      retryConfig: {
        maxRetries: 0,
        retryOn: [],
      },
    });

    return Response.json(safeData, { status: 201 });
  } catch (e) {
    const apiError = toApiError(e);

    return respondError(apiError);
  }
}
