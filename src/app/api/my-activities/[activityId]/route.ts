import { createApiError, respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import {
  createActivityApiResponseSchema,
  updateMyActivityApiRequestSchema,
} from '@/shared/schema/activity';

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ activityId: string }> },
) {
  try {
    const { activityId: activityIdParam } = await params;
    const activityId = Number(activityIdParam);

    if (!activityIdParam || !Number.isFinite(activityId)) {
      throw createApiError({
        status: 400,
        message: 'activityId가 올바르지 않습니다.',
      });
    }

    await serverApi.del({
      path: `/my-activities/${activityId}`,
      retryConfig: {
        maxRetries: 0,
        retryOn: [],
      },
    });

    return new Response(null, { status: 204 });
  } catch (e) {
    return respondError(toApiError(e));
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ activityId: string }> }) {
  try {
    const { activityId: activityIdParam } = await params;
    const activityId = Number(activityIdParam);

    if (!activityIdParam || !Number.isFinite(activityId)) {
      throw createApiError({
        status: 400,
        message: 'activityId가 올바르지 않습니다.',
      });
    }

    const body = await req.json();
    const parsed = updateMyActivityApiRequestSchema.parse(body);

    const response = await serverApi.patch({
      path: `/my-activities/${activityId}`,
      body: parsed,
      schema: createActivityApiResponseSchema,
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
