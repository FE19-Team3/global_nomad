// activity/hooks/useActivityOffsetList.ts
'use client';
import { useQuery } from '@tanstack/react-query';

import { clientApi } from '@/shared/api/client';
import { ActivityCategory, ActivitySort } from '@/shared/constants/activity';

import { mapToActivityCardItem } from '../activity-list/lib/mapToActivityCardItem';
import {
  ActivityListResponse,
  ActivityListResponseSchema,
  type ActivityQuery,
} from '../activity-list/schema/activity-list.schema';

interface Params {
  category?: ActivityCategory;
  enabled?: boolean;
  keyword?: string;
  page?: number;
  size?: number;
  sort?: ActivitySort;
  initialData?: ActivityListResponse;
}

export const useActivityOffsetList = ({
  category,
  enabled = true,
  keyword,
  page = 1,
  size = 20,
  sort = 'latest',
  initialData,
}: Params) => {
  const queryParams: ActivityQuery = {
    method: 'offset',
    page,
    size,
    ...(category && { category }),
    ...(keyword && { keyword }),
    ...(sort && { sort }),
  };

  const query = useQuery({
    queryKey: ['activities-offset', page, category, keyword, sort],
    queryFn: async () => {
      const res = await clientApi.get({
        path: '/activities',
        query: queryParams,
        schema: ActivityListResponseSchema,
      });
      return res.data;
    },
    enabled,
    initialData,
    staleTime: 5 * 60 * 1000, // 5분
  });

  return {
    activities: query.data?.activities.map(mapToActivityCardItem) ?? [],
    totalCount: query.data?.totalCount ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export type UseActivityOffsetListReturn = ReturnType<typeof useActivityOffsetList>;
