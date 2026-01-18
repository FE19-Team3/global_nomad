import { NextRequest } from 'next/server';

import { createApiError, respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { reservedScheduleSchema } from '@/shared/schema/reservation/reserved-schedule.schema';

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
    const date = searchParams.get('date') ?? '';

    const response = await serverApi.get({
      path: `/my-activities/${activityId}/reserved-schedule`,
      query: { date },
      schema: reservedScheduleSchema,
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
