import { create } from 'zustand';

type Step = 'date' | 'people';

interface ReservationState {
  isOpen: boolean;
  step: Step;
  headCount: number;
  selectedTime: string | null;
  setIsOpen: (open: boolean) => void;
  setStep: (step: Step) => void;
  setHeadCount: (headCount: number) => void;
  setSelectedTime: (selectedTime: string) => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  isOpen: false,
  step: 'date',
  headCount: 1,
  selectedTime: null,

  setIsOpen: (isOpen) => set({ isOpen }),
  setStep: (step) => set({ step }),
  setHeadCount: (headCount) => set({ headCount }),
  setSelectedTime: (selectedTime) => set({ selectedTime }),
}));
