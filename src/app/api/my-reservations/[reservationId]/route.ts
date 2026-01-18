import { NextResponse, NextRequest } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { ReservationEditResponseSchema } from '@/shared/schema/reservation/reservationList/schema';

export const PATCH = async (req: NextRequest) => {
  try {
    const path = req.nextUrl.pathname.replace('/api', '');
    const { data } = await serverApi.patch({
      path,
      body: await req.json(),
      schema: ReservationEditResponseSchema,
    });

    return NextResponse.json(data);
  } catch (e) {
    return respondError(toApiError(e));
  }
};
