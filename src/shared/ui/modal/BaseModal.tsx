'use client';

import { type ReactNode, useEffect } from 'react';

import CloseIcon from '@/shared/assets/images/modal/modal-close.svg';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  children: ReactNode;
  zIndex?: number;
}

const BaseModal = ({
  isOpen,
  onClose,
  showCloseButton = false,
  children,
  zIndex = 50,
}: BaseModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      style={{ zIndex }}
      onClick={onClose}
      role="alertdialog"
    >
      <div
        className="rounded-2xl bg-white p-6 max-w-100 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <div className="flex justify-end mb-2">
            <button onClick={onClose}>
              <CloseIcon className="w-6 h-6 text-black" aria-label="닫기" />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default BaseModal;
