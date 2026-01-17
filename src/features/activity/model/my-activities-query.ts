import type { MyActivitiesQuery } from '@/features/activity/api/get-my-activities';

export const getMyActivitiesQueryKey = (query: MyActivitiesQuery = {}) => {
  return ['my-activities', query.cursorId ?? null, query.size ?? null];
};
