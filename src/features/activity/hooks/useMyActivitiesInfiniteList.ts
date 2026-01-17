'use client';

import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

import { clientApi } from '@/shared/api/client';
import { myActivitiesApiResponseSchema } from '@/shared/schema/activity';
import type { MyActivitiesApiResponse } from '@/shared/schema/activity';

import type { MyActivitiesQuery } from '../api/get-my-activities';
import { getMyActivitiesInfiniteQueryKey } from '../model/my-activities-infinite-query';

type Params = {
  size?: number;
};

const useMyActivitiesInfiniteList = ({ size = 4 }: Params = {}) => {
  const query = useInfiniteQuery<
    // React Query v5의 useInfiniteQuery 제네릭 타입 지정
    MyActivitiesApiResponse, // queryFn에서 반환되는 데이터 타입
    unknown, // 에러 타입
    InfiniteData<MyActivitiesApiResponse>, // data 타입
    readonly unknown[], // queryKey (항상 readonly unknown[])
    number | undefined // pageParam
  >({
    queryKey: getMyActivitiesInfiniteQueryKey({ size } satisfies MyActivitiesQuery),
    queryFn: async ({ pageParam = undefined }) => {
      const res = await clientApi.get({
        path: '/my-activities',
        query: {
          size,
          ...(pageParam && { cursorId: pageParam }),
        },
        schema: myActivitiesApiResponseSchema,
      });

      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    initialPageParam: undefined,
  });

  return {
    activities: query.data?.pages
      ? query.data.pages.flatMap((page) =>
          page.activities.map((activity) => ({
            id: activity.id,
            title: activity.title,
            rating: activity.rating,
            reviewCount: activity.reviewCount,
            price: activity.price,
            bannerImageUrl: activity.bannerImageUrl,
          })),
        )
      : [],
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};

export default useMyActivitiesInfiniteList;
