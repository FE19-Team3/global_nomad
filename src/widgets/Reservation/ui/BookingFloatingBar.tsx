'use client';

import { tv } from 'tailwind-variants';

import { useModalStore } from '@/shared/stores/useModalStore';
import Button from '@/shared/ui/Button/Button';

import { useReservationStore } from '../store/reservationStore';

const styles = tv({
  slots: {
    root: 'fixed flex flex-col gap-3 bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-4.5 lg:hidden z-50 pb-[calc(1rem+env(safe-area-inset-bottom))]',
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
}

export const BookingFloatingBar = ({ price }: BookingFloatingBarProps) => {
  const { headCount, setIsOpen, selectedTime } = useReservationStore();
  const { openAlert } = useModalStore();
  const isDisabled = selectedTime ? false : true;
  const slots = styles();

  return (
    <div className={slots.root()}>
      <div className={slots.infoArea()}>
        <div className={slots.price()}>
          ₩ {headCount * price} <span className={slots.unit()}>/ {headCount}명</span>
        </div>
        {/* 날짜 선택하기를 눌러도 바텀시트가 열려야 하므로 onOpen 연결 */}
        <button type="button" className={slots.link()} onClick={() => setIsOpen(true)}>
          {selectedTime ? selectedTime : '날짜 선택하기'}
        </button>
      </div>

      <Button
        disabled={isDisabled}
        onClick={() => openAlert('예약이 완료 되었습니다.')}
        size="full"
        className={slots.reserveBtn()}
      >
        예약하기
      </Button>
    </div>
  );
};
