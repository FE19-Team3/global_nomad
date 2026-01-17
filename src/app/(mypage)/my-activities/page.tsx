import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getMyActivitiesServer } from '@/features/activity/api/get-my-activities.server';
import { getMyActivitiesInfiniteQueryKey } from '@/features/activity/model/my-activities-infinite-query';
import { MyActivitiesManageContent } from '@/widgets/mypage';

const MyActivites = async () => {
  const initialQuery = { size: 4 };
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: getMyActivitiesInfiniteQueryKey(initialQuery),
    queryFn: ({ pageParam = undefined }) =>
      getMyActivitiesServer({
        ...initialQuery,
        ...(pageParam ? { cursorId: pageParam } : {}),
      }),
    initialPageParam: undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyActivitiesManageContent query={initialQuery} />
    </HydrationBoundary>
  );
};

export default MyActivites;
