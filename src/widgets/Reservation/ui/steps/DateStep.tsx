import DatePicker from '@/shared/ui/DatePicker/DatePicker';
import Text from '@/shared/ui/Text';

import { useReservationStore } from '../../store/reservationStore';
interface DateStepProps {
  className?: string;
  availableDates: string[];
}
export const DateStep = ({ className, availableDates }: DateStepProps) => {
  const { setDate } = useReservationStore();
  if (availableDates.length === 0) {
    return <Text.M16>예약 가능한 날짜가 없습니다</Text.M16>;
  }
  return (
    <div className={className}>
      <DatePicker selectedDates={availableDates} onDateSelect={(date) => setDate(date)} />
    </div>
  );
};
