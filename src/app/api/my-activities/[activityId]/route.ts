import { createApiError, respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';

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
