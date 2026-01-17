import { NextRequest } from 'next/server';

import {
  ActivityQuerySchema,
  ActivityListResponseSchema,
} from '@/features/activity/activity-list/schema/activity-list.schema';
import { respondError, toApiError } from '@/shared/api';
import { serverApi } from '@/shared/api/server';
import {
  createActivityApiRequestSchema,
  createActivityApiResponseSchema,
} from '@/shared/schema/activity';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = createActivityApiRequestSchema.parse(data);

    const response = await serverApi.post({
      path: '/activities',
      body: {
        ...parsed,
        price: Number(parsed.price),
      },
      schema: createActivityApiResponseSchema,
      retryConfig: {
        maxRetries: 0,
        retryOn: [],
      },
    });

    return Response.json(response.data, { status: 201 });
  } catch (e) {
    return respondError(toApiError(e));
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // query parameters를 객체로 변환
    const getOptionalParam = (value: string | null) =>
      value && value.trim() !== '' ? value : undefined;

    const queryParams = {
      method: searchParams.get('method') ?? 'cursor',
      cursorId: searchParams.get('cursorId') ? Number(searchParams.get('cursorId')) : undefined,
      category: getOptionalParam(searchParams.get('category')),
      keyword: getOptionalParam(searchParams.get('keyword')),
      sort: getOptionalParam(searchParams.get('sort')),
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      size: searchParams.get('size') ? Number(searchParams.get('size')) : 20,
    };

    const cleanedQueryParams = Object.fromEntries(
      Object.entries(queryParams).filter(([, v]) => v !== undefined && v !== null && v !== ''),
    );

    // 쿼리 파라미터 유효성 검사
    const parsed = ActivityQuerySchema.parse(cleanedQueryParams);

    const response = await serverApi.get({
      path: '/activities',
      query: parsed,
      schema: ActivityListResponseSchema,
    });

    return Response.json(response.data, { status: 200 });
  } catch (e) {
    return respondError(toApiError(e));
  }
}
