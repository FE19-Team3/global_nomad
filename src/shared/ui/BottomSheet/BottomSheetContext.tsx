'use client';

import { createContext, useContext } from 'react';

interface BottomSheetContextProps {
  onClose: () => void;
}

export const BottomSheetContex = createContext<BottomSheetContextProps | null>(null);

export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContex);
  if (!context)
    throw new Error('BottomSheet 하위 컴포넌트는 BottomSheet 내부에서 사용되어야 합니다.');
  return context;
};
