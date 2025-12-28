'use client';

import { type ReactNode, useEffect } from 'react';

import { useModalStore } from '@/shared/stores/useModalStore';

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const { isModalOpen, closeModal } = useModalStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
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
