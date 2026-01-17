import { type getReservationListParams } from '@/entities/reservation/api/getReservationList';
import { getReservationList } from '@/entities/reservation/api/getReservationList';
import { type SchemaParser } from '@/shared/api';
import { type BaseOptions } from '@/shared/api/core';
import {
  ReservationListResponseDto,
  ReservationListResponseSchema,
} from '@/shared/schema/reservation/reservationList/schema';

type queryFnParams = BaseOptions & { schema: SchemaParser<ReservationListResponseDto> };

export const reservationListKey = ({ size, status }: Omit<getReservationListParams, 'cursorId'>) =>
  ['my-reservations', { size, status }] as const;

export const reservationListQuery = (
  params: getReservationListParams,
  queryFn?: (params: queryFnParams) => Promise<ReservationListResponseDto>,
) => ({
  queryKey: reservationListKey(params),
  queryFn: () =>
    queryFn
      ? queryFn({ path: '/my-reservation', schema: ReservationListResponseSchema })
      : getReservationList(params),
  staleTime: Infinity,
  refetchOnWindowFocus: false,
});
