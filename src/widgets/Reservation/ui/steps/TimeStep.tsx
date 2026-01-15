import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';

import { useReservationStore } from '../../store/reservationStore';

const Mocktimes = ['14:00~15:00', '15:00~16:00']; //임시 타임

export const TimeStep = () => {
  const { selectedTime, setSelectedTime } = useReservationStore();
  return (
    <div className="flex flex-col gap-3">
      <Text size={16} weight="B">
        예약 가능한 시간
      </Text>
      {Mocktimes.map((time) => (
        <Button
          key={time}
          variant="secondary"
          size="md"
          selected={selectedTime === time}
          onClick={() => setSelectedTime(time)}
        >
          {time}
        </Button>
      ))}
    </div>
  );
};
