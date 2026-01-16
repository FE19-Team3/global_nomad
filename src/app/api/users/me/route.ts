import { NextResponse } from 'next/server';

import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import { userMeResponseSchema } from '@/shared/schema/user/user-me-response.schema';

export const GET = async () => {
  try {
    const { data: user } = await serverApi.get({
      path: '/users/me',
      schema: userMeResponseSchema,
    });

    return NextResponse.json(user);
  } catch (e) {
    return respondError(toApiError(e));
  }
};
