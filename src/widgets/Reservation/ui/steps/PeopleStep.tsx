import Text from '@/shared/ui/Text';
import { HeadcountSelector } from '@/widgets/headcount-selector';

import { useReservationStore } from '../../store/reservationStore';

export const PeopleStep = () => {
  const { headCount, setHeadCount } = useReservationStore();
  return (
    <div>
      <Text className="text-gray-600 md:hidden">예약할 인원을 선택해주세요.</Text>
      <div className="flex items-center justify-between mt-4 md:flex-col md:items-start md:mt-8 lg:flex-row lg:items-center lg:mt-6">
        <Text size={16} weight="B">
          참여 인원 수
        </Text>
        <HeadcountSelector
          count={headCount}
          onChange={setHeadCount}
          className="h-13 rounded-xl md:mt-5 md:max-w-full lg:w-35 lg:rounded-full lg:mt-0 lg:h-10"
        />
      </div>
    </div>
  );
};
