import { toMinutes, toDateInputValue, normalizeDate } from '@/shared/lib/time';
import { Radio } from '@/shared/ui/Radio';
import Text from '@/shared/ui/Text';

import { useReservationStore } from '../../store/reservationStore';
import { ActivitySchedule } from '../../types';

interface TimeStepProps {
  schedules: ActivitySchedule[];
}

export const TimeStep = ({ schedules }: TimeStepProps) => {
  const { date, selectedTime, setSelectedTime, setSelectedScheduleId } = useReservationStore();
  const currentDate = schedules?.filter((item) => item.date === date);
  const availableTimes = currentDate?.flatMap((schedule) => schedule.times || []) || [];
  const now = new Date();
  const today = toDateInputValue(normalizeDate(now));
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const filteredTimes =
    date === today
      ? availableTimes.filter((time) => {
          const startMinutes = toMinutes(time.startTime);
          if (startMinutes === null) return false;
          return startMinutes > nowMinutes;
        })
      : availableTimes;

  return (
    <div className="flex flex-col gap-3">
      <Text size={16} weight="B">
        예약 가능한 시간
      </Text>
      {filteredTimes.length === 0 && (
        <Text size={14} className="text-gray-500">
          예약 가능한 시간이 없습니다.
        </Text>
      )}
      {/* Button → Radio로 변경 */}
      <Radio
        name="reservation-time"
        selectedValue={selectedTime ?? undefined}
        onChange={(value) => {
          setSelectedTime(value);
          // value에서 scheduleId 찾기
          const time = filteredTimes.find((t) => `${t.startTime}~${t.endTime}` === value);
          if (time) setSelectedScheduleId(time.id);
        }}
      >
        {filteredTimes.map((time) => (
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
