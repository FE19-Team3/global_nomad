import { NextRequest, NextResponse } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { activityReviewsResponseSchema } from '@/shared/schema/review/activity-reviews-response.schema';

export async function GET(req: NextRequest, { params }: { params: { activityId: string } }) {
  try {
    const { activityId } = await params;
    const { searchParams } = new URL(req.url);

    // query 기본값 처리
    const page = Number(searchParams.get('page') ?? 1);
    const size = Number(searchParams.get('size') ?? 3);

    const { data } = await serverApi.get({
      path: `/activities/${activityId}/reviews`,
      query: { page, size },
      schema: activityReviewsResponseSchema,
    });

    return NextResponse.json(data);
  } catch (e) {
    return respondError(toApiError(e));
  }
}
