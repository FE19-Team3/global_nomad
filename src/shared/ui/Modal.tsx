'use client';

import type { ReactNode } from 'react';

import { useModalStore } from '@/shared/stores/useModalStore';

export default function Modal({ children }: { children: ReactNode }) {
  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <div
        className="flex flex-col gap-y-5 rounded-[30px] bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
