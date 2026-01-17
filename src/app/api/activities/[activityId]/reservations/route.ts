import { NextRequest, NextResponse } from 'next/server';

import { createReservation } from '@/entities/reservation/api/createReservation';
import { respondError, toApiError } from '@/shared/api';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ activityId: string }> },
) {
  try {
    const { activityId } = await params;
    const body = await req.json();

    const { data } = await createReservation({
      activityId: Number(activityId),
      body,
    });

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return respondError(toApiError(e));
  }
}
