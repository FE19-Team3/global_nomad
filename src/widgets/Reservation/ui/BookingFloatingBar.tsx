'use client';

import { tv } from 'tailwind-variants';

import Button from '@/shared/ui/Button/Button';

import { useReservationStore } from '../store/reservationStore';

const styles = tv({
  slots: {
    root: 'fixed flex flex-col gap-3 bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-4.5 lg:hidden z-[10] pb-[calc(1rem+env(safe-area-inset-bottom))]',
    infoArea: 'flex justify-between items-center gap-0.5',
    price: 'text-lg font-bold text-gray-950',
    unit: 'text-base text-gray-600 font-normal',
    link: 'text-primary-500 underline text-sm font-semibold text-left',
    reserveBtn: 'font-bold',
  },
  defaultVariants: {
    isDisabled: false,
  },
});

interface BookingFloatingBarProps {
  price: number;
  onReserve: (scheduleId: number) => void;
}

export const BookingFloatingBar = ({ price, onReserve }: BookingFloatingBarProps) => {
  const { date, headCount, setIsOpen, selectedTime, selectedScheduleId } = useReservationStore();
  const isDisabled = !selectedTime;
  const slots = styles();

  return (
    <div className={slots.root()}>
      <div className={slots.infoArea()}>
        <div className={slots.price()}>
          ₩ {headCount * price} <span className={slots.unit()}>/ {headCount}명</span>
        </div>
        {/* 날짜 선택하기를 눌러도 바텀시트가 열려야 하므로 onOpen 연결 */}
        <button type="button" className={slots.link()} onClick={() => setIsOpen(true)}>
          {date && selectedTime ? `${date} ${selectedTime}` : '날짜 선택하기'}
        </button>
      </div>

      <Button
        disabled={isDisabled}
        onClick={() => {
          if (!selectedScheduleId) return;
          onReserve(selectedScheduleId);
        }}
        size="full"
        className={slots.reserveBtn()}
      >
        예약하기
      </Button>
    </div>
  );
};
