'use client';

import { useState, ReactNode } from 'react';

import { dropdownStyles } from './Dropdown.style';
import { DropdownContext } from './DropdownContext';

interface DropdownProps {
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: 'md';
  radius?: 'md';
  disabled?: boolean;
}

const Dropdown = ({
  children,
  value,
  onChange,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  disabled = false,
}: DropdownProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  // 선택된 value에 대응하는 label 저장용 상태
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();

  // 외부 props 있으면 Controlled, 없으면 Uncontrolled
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;

  const onOpenChange = (newOpen: boolean) => {
    if (disabled) return;

    if (isControlled) {
      // Controlled인 경우 외부 함수 호출
      externalOnOpenChange?.(newOpen);
    } else {
      // Uncontrolled인 경우 내부 상태 업데이트
      setInternalOpen(newOpen);
    }
  };

  const handleSelect = (newValue: string, label?: string) => {
    onChange?.(newValue);
    // Trigger에 보여줄 label 저장
    setSelectedLabel(label);
    onOpenChange(false);
  };

  const styles = dropdownStyles({ open, disabled });

  return (
    <DropdownContext.Provider
      value={{
        open,
        onOpenChange,
        value,
        onValueChange: handleSelect,
        selectedLabel,
        styles,
      }}
    >
      <div className={styles.container()}>{children}</div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
