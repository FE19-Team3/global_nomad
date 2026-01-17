import type { MyActivitiesQuery } from '@/features/activity/api/get-my-activities';

export const myActivitiesInfiniteQueryKey = ['my-activities-infinite'] as const;

export const getMyActivitiesInfiniteQueryKey = (query: MyActivitiesQuery = {}) => {
  return [...myActivitiesInfiniteQueryKey, query.size ?? null] as const;
};
