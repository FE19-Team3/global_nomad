import { type getReservationListParams } from '@/entities/reservation/api/getReservationList';
import { getReservationList } from '@/entities/reservation/api/getReservationList';
import {
  ReservationListResponseDto,
  ReservationListResponseSchema,
} from '@/shared/schema/reservation/reservationList/schema';

export const reservationListKey = ({ size, status }: Omit<getReservationListParams, 'cursorId'>) =>
  ['my-reservations', { size, status }] as const;

type InjectedGet = (args: {
  path: string;
  query: getReservationListParams;
  schema: typeof ReservationListResponseSchema;
}) => Promise<{ data: ReservationListResponseDto }>;

export const reservationListInfiniteQuery = (
  params: getReservationListParams,
  queryFn?: InjectedGet,
) => ({
  queryKey: reservationListKey(params),
  queryFn: async ({ pageParam }: { pageParam?: number }) => {
    const query: getReservationListParams = {
      ...params,
      ...(pageParam !== undefined ? { cursorId: pageParam } : {}),
    };

    if (queryFn) {
      const res = await queryFn({
        path: '/my-reservations',
        query,
        schema: ReservationListResponseSchema,
      });
      return res.data;
    }

    return getReservationList(query);
  },
  initialPageParam: undefined as number | undefined,
  getNextPageParam: (lastPage: ReservationListResponseDto) => {
    return lastPage.cursorId ?? undefined;
  },
  staleTime: Infinity,
  refetchOnWindowFocus: false,
});
