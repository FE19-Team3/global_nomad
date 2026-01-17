import { NextResponse } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { ReservationListResponseSchema } from '@/shared/schema/reservation/reservationList/schema';

export const GET = async () => {
  try {
    const { data: reservations } = await serverApi.get({
      path: '/my-reservations',
      schema: ReservationListResponseSchema,
    });

    return NextResponse.json(reservations);
  } catch (e) {
    return respondError(toApiError(e));
  }
};
