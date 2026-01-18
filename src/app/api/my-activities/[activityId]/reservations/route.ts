import { NextRequest } from 'next/server';

import { createApiError, respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { hostReservationsSchema } from '@/shared/schema/reservation/host-reservations.schema';

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
    const cursorIdParam = searchParams.get('cursorId');
    const sizeParam = searchParams.get('size');
    const scheduleIdParam = searchParams.get('scheduleId');
    const status = searchParams.get('status') ?? '';

    const cursorId = cursorIdParam ? Number(cursorIdParam) : undefined;
    const size = sizeParam ? Number(sizeParam) : undefined;
    const scheduleId = scheduleIdParam ? Number(scheduleIdParam) : undefined;

    const response = await serverApi.get({
      path: `/my-activities/${activityId}/reservations`,
      query: {
        ...(cursorId !== undefined ? { cursorId } : {}),
        ...(size !== undefined ? { size } : {}),
        ...(scheduleId !== undefined ? { scheduleId } : {}),
        ...(status ? { status } : {}),
      },
      schema: hostReservationsSchema,
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
