import { NextRequest } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const response = await serverApi.requestJson({
      path: '/activities/image',
      method: 'POST',
      body: formData,
      retryConfig: {
        maxRetries: 0,
        retryOn: [],
      },
    });

    return Response.json(response.data, { status: response.status });
  } catch (e) {
    return respondError(toApiError(e));
  }
}
