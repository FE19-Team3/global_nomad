'use client';
// 테스트

import { useState, ReactNode } from 'react';

import { DropdownContext } from './DropdownContext';

interface DropdownProps {
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dropdown = ({
  children,
  value,
  onChange,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: DropdownProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  // 외부 props 있으면 Controlled, 없으면 Uncontrolled
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;

  const onOpenChange = (newOpen: boolean) => {
    if (isControlled) {
      // Controlled인 경우 외부 함수 호출
      externalOnOpenChange?.(newOpen);
    } else {
      // Uncontrolled인 경우 내부 상태 업데이트
      setInternalOpen(newOpen);
    }
  };

  const handleSelect = (newValue: string) => {
    onChange?.(newValue);
    onOpenChange(false);
  };

  return (
    <DropdownContext.Provider
      value={{
        open,
        onOpenChange,
        value: value,
        onValueChange: handleSelect,
      }}
    >
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
