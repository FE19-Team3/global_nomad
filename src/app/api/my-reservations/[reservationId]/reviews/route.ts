import { NextResponse, NextRequest } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { reviewSchema } from '@/widgets/BookingCard/components/schema/schema';

export const POST = async (req: NextRequest) => {
  try {
    const path = req.nextUrl.pathname.replace('/api', '');
    const body = await req.json();
    const { data } = await serverApi.post({
      path,
      body,
      schema: reviewSchema,
    });

    return NextResponse.json(data);
  } catch (e) {
    return respondError(toApiError(e));
  }
};
