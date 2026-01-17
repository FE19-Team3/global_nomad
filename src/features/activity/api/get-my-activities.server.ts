import 'server-only';

import { serverApi } from '@/shared/api/server';
import { myActivitiesApiResponseSchema } from '@/shared/schema/activity';

import type { MyActivitiesQuery } from './get-my-activities';

export const getMyActivitiesServer = async (query: MyActivitiesQuery = {}) => {
  const response = await serverApi.get({
    path: '/my-activities',
    query,
    schema: myActivitiesApiResponseSchema,
    retryConfig: {
      maxRetries: 0,
      retryOn: [],
    },
  });

  return response.data;
};
