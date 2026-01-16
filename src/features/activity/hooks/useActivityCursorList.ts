'use client';

import { useQuery } from '@tanstack/react-query';

import { clientApi } from '@/shared/api/client';
import { ActivityCategory, ActivitySort, ActivitySortValues } from '@/shared/constants/activity';

import { mapToActivityCardItem } from '../activity-list/lib/mapToActivityCardItem';
import {
  ActivityListResponse,
  ActivityListResponseSchema,
} from '../activity-list/schema/activity-list.schema';

interface Params {
  category?: ActivityCategory;
  cursorId?: number;
  enabled?: boolean;
  keyword?: string;
  size?: number;
  sort?: ActivitySort['values'];
  initialData?: ActivityListResponse;
}

export const useActivityCursorList = ({
  category,
  cursorId,
  enabled = true,
  keyword,
  size = 20,
  sort = ActivitySortValues[0].values,
  initialData,
}: Params) => {
  const queryParamsForApi: Record<string, string | number> = {
    method: 'cursor',
    size,
    ...(category && { category: category?.value }),
    ...(keyword && { keyword }),
    ...(sort && { sort }),
    ...(cursorId !== undefined && { cursorId }),
  };

  const query = useQuery({
    queryKey: ['activities-cursor', size, category?.value, cursorId, keyword, sort],
    queryFn: async () => {
      const res = await clientApi.get({
        path: '/activities',
        query: queryParamsForApi,
        schema: ActivityListResponseSchema,
      });
      return res.data;
    },
    enabled: enabled && !initialData,
    initialData: !category && !keyword && sort === 'latest' ? initialData : undefined,
    staleTime: 5 * 60 * 1000, // 5분
  });

  return {
    activities: query.data?.activities.map(mapToActivityCardItem) ?? [],
    cursorId: query.data?.cursorId,
    totalCount: query.data?.totalCount ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export type UseActivityCursorListReturn = ReturnType<typeof useActivityCursorList>;
