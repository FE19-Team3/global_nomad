import { clientApi } from '@/shared/api/client';
import { activityReviewsResponseSchema } from '@/shared/schema/review/activity-reviews-response.schema';

export const getActivityReviews = (activityId: number, page = 1, size = 3) => {
  return clientApi.get({
    path: `/activities/${activityId}/reviews`,
    query: { page, size },
    schema: activityReviewsResponseSchema,
  });
};
