'use client';

//createContext: 여러 컴포넌트가 공유할 데이터 저장소를 만드는 함수
//useContext: 만들어진 저장소에서 데이터를 꺼내 쓰는 함수
import { createContext, useContext } from 'react';

interface DropdownContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
}

//데이터 저장소 생성
export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

//데이터 꺼내 쓰기
export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown 컴포넌트 내부에서만 사용 가능합니다.');
  }
  return context;
};
