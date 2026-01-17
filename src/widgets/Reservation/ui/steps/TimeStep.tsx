import { Radio } from '@/shared/ui/Radio';
import Text from '@/shared/ui/Text';

import { useReservationStore } from '../../store/reservationStore';
import { ActivitySchedule } from '../../types';

interface TimeStepProps {
  schedules: ActivitySchedule[];
}

export const TimeStep = ({ schedules }: TimeStepProps) => {
  const { date, selectedTime, setSelectedTime, setSelectedScheduleId } = useReservationStore();
  const currentDate = schedules?.find((item) => item.date === date);
  const availableTimes = currentDate?.times || [];

  return (
    <div className="flex flex-col gap-3">
      <Text size={16} weight="B">
        예약 가능한 시간
      </Text>
      {/* Button → Radio로 변경 */}
      <Radio
        name="reservation-time"
        selectedValue={selectedTime ?? undefined}
        onChange={(value) => {
          setSelectedTime(value);
          // value에서 scheduleId 찾기
          const time = availableTimes.find((t) => `${t.startTime}~${t.endTime}` === value);
          if (time) setSelectedScheduleId(time.id);
        }}
      >
        {availableTimes.map((time) => (
          <Radio.Item
            key={time.id}
            value={`${time.startTime}~${time.endTime}`}
            label={`${time.startTime}~${time.endTime}`}
          />
        ))}
      </Radio>
    </div>
  );
};
