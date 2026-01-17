import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { serverApi } from '@/shared/api/server';
import { ReservationListResponseSchema } from '@/shared/schema/reservation/reservationList/schema';

import { reservationListQuery } from './queries/reservationList';
import { ReservationListClient } from './reservation-list.client';

const ReservationListPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    reservationListQuery({}, async (params) => {
      const res = await serverApi.get({ ...params, schema: ReservationListResponseSchema });
      return res.data;
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReservationListClient />
    </HydrationBoundary>
  );
};

export default ReservationListPage;
