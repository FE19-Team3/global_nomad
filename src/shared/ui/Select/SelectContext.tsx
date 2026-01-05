'use client';
import { createContext, useContext } from 'react';

import { SelectContextValue } from './Select.types';

export const SelectContext = createContext<SelectContextValue | undefined>(undefined);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select 컴포넌트 내부에서만 사용 가능합니다.');
  }
  return context;
};
