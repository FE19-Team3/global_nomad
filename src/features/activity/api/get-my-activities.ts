import { clientApi } from '@/shared/api/client';
import { myActivitiesApiResponseSchema } from '@/shared/schema/activity';

export type MyActivitiesQuery = {
  cursorId?: number;
  size?: number;
};

export const getMyActivities = async (query: MyActivitiesQuery = {}) => {
  const response = await clientApi.get({
    path: '/my-activities',
    query,
    schema: myActivitiesApiResponseSchema,
  });

  return response.data;
};
