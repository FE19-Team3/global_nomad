'use client';

import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

import { NotificationApiResponse } from '@/entities/notification/model/schema';

import { getNotifications } from './getNotification';
import { parseNotification } from './parser';

interface Params {
  size?: number;
}

const useNotificationInfiniteList = ({ size = 10 }: Params = {}) => {
  const query = useInfiniteQuery<
    NotificationApiResponse,
    unknown,
    InfiniteData<NotificationApiResponse>,
    readonly unknown[],
    number | undefined
  >({
    queryKey: ['notifications', size],
    queryFn: async ({ pageParam = undefined }) => {
      return getNotifications({
        size,
        ...(pageParam && { cursorId: pageParam }),
      });
    },
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    initialPageParam: undefined,
    staleTime: 60 * 1000,
  });

  return {
    notifications: query.data
      ? query.data.pages.flatMap((page) => page.notifications.map(parseNotification))
      : [],
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
  };
};

export default useNotificationInfiniteList;
