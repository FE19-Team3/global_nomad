import { serverApi } from '@/shared/api/server';
import { activityDetailResponseSchema } from '@/shared/schema/activity/activit-detail-response.schema';

export const getActivityDetail = (activityId: number) => {
  return serverApi.get({
    path: `/activities/${activityId}`,
    schema: activityDetailResponseSchema,
  });
};
