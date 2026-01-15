'use client';

import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';

import { useReservationStore } from '../store/reservationStore';

import { BookingBottomSheet } from './BookingBottomSheet';
import { BookingFloatingBar } from './BookingFloatingBar';
import { DateStep } from './steps/DateStep';
import { PeopleStep } from './steps/PeopleStep';
import { TimeStep } from './steps/TimeStep';

interface ReservationSectionProps {
  price: number;
}
export const ReservationSection = ({ price }: ReservationSectionProps) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { headCount } = useReservationStore();

  // 1. PC 사이드바 (aside 레이아웃)
  if (isDesktop) {
    return (
      <aside className="hidden lg:block lg:w-[384px]">
        <div className="sticky flex flex-col gap-y-6 top-18 border border-gray-100 rounded-2xl p-6 bg-white shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
          <div className="text-2xl font-bold">
            ₩ {price.toLocaleString()}{' '}
            <Text size={20} className="text-gray-600">
              /인
            </Text>
          </div>
          <div>
            <Text size={16} weight="B" className=" block">
              날짜
            </Text>
            <DateStep className="mt-4" />
          </div>
          <PeopleStep />
          <div>
            <TimeStep />
          </div>
          <div className="flex justify-between items-center font-bold pt-4 border-t border-gray-100">
            <div className="flex flex-1 gap-x-1">
              <Text size={20} className="text-gray-600">
                총 합계
              </Text>
              <Text size={20} weight="B">
                ₩ {headCount * 1000}
              </Text>
            </div>
            <Button size="sm">예약하기</Button>
          </div>
        </div>
      </aside>
    );
  }

  // 2. 모바일/태블릿 (플로팅 바 + 바텀시트)
  return (
    <>
      <BookingFloatingBar price={price} />
      <BookingBottomSheet />
    </>
  );
};
