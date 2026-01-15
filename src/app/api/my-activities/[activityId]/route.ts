import { createApiError, respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';

export async function DELETE(req: Request) {
  try {
    const pathname = new URL(req.url).pathname;
    const activityIdParam = pathname.split('/').pop();
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
