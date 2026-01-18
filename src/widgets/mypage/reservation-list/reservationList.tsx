import { type ReservationDTO } from '@/shared/schema/reservation/reservationList/schema';
import { BookingCard } from '@/widgets/BookingCard/BookingCard';

type ReservationListProps = {
  data: ReservationDTO[];
};

export const ReservationList = ({ data }: ReservationListProps) => {
  return (
    <div className="flex flex-col gap-16 mt-8">
      {data.map((reservation) => (
        <BookingCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
};
