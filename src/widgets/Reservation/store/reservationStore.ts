import { create } from 'zustand';

type Step = 'date' | 'people';

interface ReservationState {
  isOpen: boolean;
  step: Step;
  headCount: number;

  selectedTime: string | null;
  selectedScheduleId: number | null;
  date: string | null;

  setIsOpen: (open: boolean) => void;
  setStep: (step: Step) => void;
  setHeadCount: (headCount: number) => void;

  setSelectedTime: (selectedTime: string) => void;
  setSelectedScheduleId: (id: number) => void;
  setDate: (date: string | null) => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  isOpen: false,
  step: 'date',
  headCount: 1,

  selectedTime: null,
  selectedScheduleId: null,
  date: null,

  setIsOpen: (isOpen) => set({ isOpen }),
  setStep: (step) => set({ step }),
  setHeadCount: (headCount) => set({ headCount }),
  setSelectedTime: (selectedTime) => set({ selectedTime }),
  setSelectedScheduleId: (id) => set({ selectedScheduleId: id }),
  setDate: (date) =>
    set({
      date,
      selectedTime: null,
      selectedScheduleId: null, // 날짜 바뀌면 시간 선택 초기화
    }),
}));
