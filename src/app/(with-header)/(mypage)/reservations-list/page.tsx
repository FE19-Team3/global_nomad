import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { serverApi } from '@/shared/api/server';
import { ReservationListResponseSchema } from '@/shared/schema/reservation/reservationList/schema';

import { reservationListInfiniteQuery } from './queries/reservationList';
import { ReservationListClient } from './reservations-list.client';

const ReservationListPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    reservationListInfiniteQuery({}, async (params) => {
      const res = await serverApi.get({ ...params, schema: ReservationListResponseSchema });
      return res;
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReservationListClient />
    </HydrationBoundary>
  );
};

export default ReservationListPage;
