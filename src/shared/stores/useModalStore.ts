import { create } from 'zustand';

export type ModalType =
  | { type: 'base'; content: React.ReactNode; showCloseButton?: boolean }
  | { type: 'alert'; message: string }
  | { type: 'confirm'; message: string; onConfirm?: () => void };

type ModalState = {
  stack: ModalType[];

  openBaseModal: (payload: { content: React.ReactNode; showCloseButton?: boolean }) => void;
  openAlert: (payload: { message: string }) => void;
  openConfirm: (payload: { message: string; onConfirm?: () => void }) => void;

  closeTop: () => void;
  closeAll: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  stack: [],

  openBaseModal: ({ content, showCloseButton }) =>
    set((state) => ({
      stack: [...state.stack, { type: 'base', content, showCloseButton }],
    })),

  openAlert: ({ message }) =>
    set((state) => ({
      stack: [...state.stack, { type: 'alert', message }],
    })),

  openConfirm: ({ message, onConfirm }) =>
    set((state) => ({
      stack: [...state.stack, { type: 'confirm', message, onConfirm }],
    })),

  closeTop: () =>
    set((state) => ({
      stack: state.stack.slice(0, -1),
    })),

  closeAll: () => set({ stack: [] }),
}));
