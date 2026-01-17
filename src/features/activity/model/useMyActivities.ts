'use client';

import { useQuery } from '@tanstack/react-query';

import { getMyActivities, type MyActivitiesQuery } from '@/features/activity/api/get-my-activities';
import { getMyActivitiesQueryKey } from '@/features/activity/model/my-activities-query';

export const useMyActivities = (query: MyActivitiesQuery = {}) => {
  return useQuery({
    queryKey: getMyActivitiesQueryKey(query),
    queryFn: () => getMyActivities(query),
  });
};
