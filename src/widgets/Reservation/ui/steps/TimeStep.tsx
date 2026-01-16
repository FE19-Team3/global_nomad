import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';

import { useReservationStore } from '../../store/reservationStore';
import { ActivitySchedule } from '../../types';

interface TimeStepProps {
  schedules: ActivitySchedule[];
}

export const TimeStep = ({ schedules }: TimeStepProps) => {
  const { date, selectedTime, setSelectedTime } = useReservationStore();
  const currentDate = schedules?.find((item) => item.date === date);
  const availableTimes = currentDate?.times || [];

  return (
    <div className="flex flex-col gap-3">
      <Text size={16} weight="B">
        예약 가능한 시간
      </Text>
      {availableTimes.map((time) => (
        <Button
          key={time.id}
          variant="secondary"
          size="md"
          selected={selectedTime === `${time.startTime}~${time.endTime}`}
          onClick={() => setSelectedTime(`${time.startTime}~${time.endTime}`)}
        >
          {`${time.startTime}~${time.endTime}`}
        </Button>
      ))}
    </div>
  );
};
