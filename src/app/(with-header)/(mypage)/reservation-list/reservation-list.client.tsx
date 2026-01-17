'use client';

import { useQuery } from '@tanstack/react-query';

import Label from '@/shared/ui/Label';

import { reservationListQuery } from './queries/reservationList';

export const ReservationListClient = () => {
  const { data, isLoading } = useQuery(reservationListQuery({}));
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Label textSize="16_B">Reservation List</Label>
    </div>
  );
};
