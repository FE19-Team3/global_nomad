import { NextRequest } from 'next/server';

import { createApiError, respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { reservationDashboardSchema } from '@/shared/schema/reservation/reservation-dashboard.schema';

export async function GET(
  req: NextRequest,
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

    const { searchParams } = req.nextUrl;
    const year = searchParams.get('year') ?? '';
    const month = searchParams.get('month') ?? '';

    const response = await serverApi.get({
      path: `/my-activities/${activityId}/reservation-dashboard`,
      query: { year, month },
      schema: reservationDashboardSchema,
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
