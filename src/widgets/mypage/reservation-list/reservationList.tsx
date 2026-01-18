import { type ReservationDTO } from '@/shared/schema/reservation/reservationList/schema';
import { BookingCard } from '@/widgets/BookingCard/BookingCard';

import { mapStatusLabelToValue, type StatusLabel } from './utils/map';

type ReservationListProps = {
  data: ReservationDTO[];
  filter: StatusLabel[];
};

export const ReservationList = ({ data, filter }: ReservationListProps) => {
  const filteredStatusValues = mapStatusLabelToValue(filter);
  const filteredData =
    filter.length === 0
      ? data
      : data.filter((reservation) => filteredStatusValues.includes(reservation.status));
  return (
    <div className="flex flex-col gap-16 mt-8">
      {filteredData.map((reservation) => (
        <BookingCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
};
