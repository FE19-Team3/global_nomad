'use client';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll';

import { styles } from './BottomSheet.styles';
import { BottomSheetContex } from './BottomSheetContext';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const slots = styles();

  return createPortal(
    <BottomSheetContex.Provider value={{ onClose }}>
      <div className={slots.overlay()} onClick={onClose} />
      {children}
    </BottomSheetContex.Provider>,
    document.body,
  );
};
