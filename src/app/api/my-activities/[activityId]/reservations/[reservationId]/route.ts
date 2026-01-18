import { createApiError, respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { reservationResponseSchema } from '@/shared/schema/reservation/reservation-response.schema';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ activityId: string; reservationId: string }> },
) {
  try {
    const { activityId: activityIdParam, reservationId: reservationIdParam } = await params;
    const activityId = Number(activityIdParam);
    const reservationId = Number(reservationIdParam);

    if (!activityIdParam || !Number.isFinite(activityId)) {
      throw createApiError({
        status: 400,
        message: 'activityId가 올바르지 않습니다.',
      });
    }

    if (!reservationIdParam || !Number.isFinite(reservationId)) {
      throw createApiError({
        status: 400,
        message: 'reservationId가 올바르지 않습니다.',
      });
    }

    const body = await req.json();

    const response = await serverApi.patch({
      path: `/my-activities/${activityId}/reservations/${reservationId}`,
      body,
      schema: reservationResponseSchema,
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
