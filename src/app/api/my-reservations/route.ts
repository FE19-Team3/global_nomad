import { NextResponse, NextRequest } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { ReservationListResponseSchema } from '@/shared/schema/reservation/reservationList/schema';

export const GET = async (req: NextRequest) => {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries());

    const { data: reservations } = await serverApi.get({
      path: '/my-reservations',
      query,
      schema: ReservationListResponseSchema,
    });

    return NextResponse.json(reservations);
  } catch (e) {
    return respondError(toApiError(e));
  }
};
