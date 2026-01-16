'use client';

import { useQuery } from '@tanstack/react-query';

import { getMyActivities, type MyActivitiesQuery } from '@/features/activity/api/get-my-activities';

export const useMyActivities = (query: MyActivitiesQuery = {}) => {
  return useQuery({
    queryKey: ['my-activities', query.cursorId ?? null, query.size ?? null],
    queryFn: () => getMyActivities(query),
  });
};
