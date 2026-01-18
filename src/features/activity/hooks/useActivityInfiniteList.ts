'use client';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

import { clientApi } from '@/shared/api/client';
import { ActivityCategory, ActivitySortValues } from '@/shared/constants/activity';

import { mapToActivityCardItem } from '../activity-list/lib/mapToActivityCardItem';
import {
  ActivityListResponse,
  ActivityListResponseSchema,
} from '../activity-list/schema/activity-list.schema';

interface Params {
  category?: ActivityCategory;
  size?: number;
  sort?: string;
}

const useActivityInfiniteList = ({
  category,
  size = 20,
  sort = ActivitySortValues[0].values,
}: Params) => {
  const query = useInfiniteQuery<
    // React Query v5의 useInfiniteQuery 제네릭 타입 지정
    ActivityListResponse, // queryFn에서 반환되는 데이터 타입
    unknown, // 에러 타입
    InfiniteData<ActivityListResponse>, // data 타입
    readonly unknown[], // queryKey (항상 readonly unknown[])
    number | undefined // pageParam
  >({
    queryKey: ['activities-infinite', size, category?.value, sort],
    queryFn: async ({ pageParam = undefined }) => {
      const res = await clientApi.get({
        path: '/activities',
        query: {
          method: 'cursor',
          size,
          ...(category && { category: category.value }),
          ...(sort && { sort }),
          ...(pageParam && { cursorId: pageParam }),
        },
        schema: ActivityListResponseSchema,
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    staleTime: 5 * 60 * 1000,
    initialPageParam: undefined,
  });

  const activities = query.data?.pages
    ? query.data.pages.flatMap((page) => page.activities.map(mapToActivityCardItem))
    : [];

  const nextCursor = query.data?.pages?.[query.data.pages.length - 1]?.cursorId ?? null;

  const fetchNextPage = () => {
    if (!nextCursor) return;
    return query.fetchNextPage();
  };

  return {
    activities,
    fetchNextPage,
    nextCursor,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
  };
};

export default useActivityInfiniteList;
