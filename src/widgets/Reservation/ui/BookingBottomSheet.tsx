'use client';

import { useEffect } from 'react';

import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import BottomSheet from '@/shared/ui/BottomSheet';
import Button from '@/shared/ui/Button/Button';

import { useReservationStore } from '../store/reservationStore';

import { DateStep } from './steps/DateStep';
import { PeopleStep } from './steps/PeopleStep';
import { TimeStep } from './steps/TimeStep';

export const BookingBottomSheet = () => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const { isOpen, setIsOpen, step, setStep } = useReservationStore();

  useEffect(() => {
    if (!isOpen) setStep('date');
  }, [isOpen]);

  return (
    <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <BottomSheet.Content>
        {isTablet ? (
          <>
            <BottomSheet.Header>날짜</BottomSheet.Header>
            <div className="flex gap-10">
              <div className="flex-1">
                <DateStep />
              </div>
              <div className="flex-1 flex flex-col py-8 px-6 rounded-3xl shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]">
                <div className="flex flex-col gap-y-5">
                  <TimeStep />
                </div>
                <PeopleStep />
              </div>
            </div>
            <BottomSheet.Footer>
              <Button onClick={() => setIsOpen(false)} size="full" className="font-bold">
                확인
              </Button>
            </BottomSheet.Footer>
          </>
        ) : step === 'date' ? (
          <>
            <BottomSheet.Header>날짜</BottomSheet.Header>
            <DateStep />
            <div className="flex flex-col gap-y-5 mt-6">
              <TimeStep />
            </div>
            <BottomSheet.Footer>
              <Button onClick={() => setStep('people')} size="full" className="font-bold">
                확인
              </Button>
            </BottomSheet.Footer>
          </>
        ) : (
          <>
            <BottomSheet.Header onBack={() => setStep('date')}>인원</BottomSheet.Header>
            <PeopleStep />
            <BottomSheet.Footer>
              <Button onClick={() => setIsOpen(false)} size="full" className="font-bold">
                확인
              </Button>
            </BottomSheet.Footer>
          </>
        )}
      </BottomSheet.Content>
    </BottomSheet>
  );
};
