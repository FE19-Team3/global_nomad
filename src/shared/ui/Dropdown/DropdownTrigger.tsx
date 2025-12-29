'use client';

import { ReactNode } from 'react';

import { useDropdown } from './DropdownContext';

interface DropdownTriggerProps {
  children?: ReactNode;
  placeholder?: string;
}

const DropdownTrigger = ({ children, placeholder }: DropdownTriggerProps) => {
  const { open, onOpenChange, value } = useDropdown();

  const displayContent = () => {
    if (value) return value; // 1순위: 선택된 값
    if (children) return children; // 2순위: 커스텀 컨텐츠
    return placeholder; // 3순위: 플레이스홀더
  };

  return (
    <button onClick={() => onOpenChange(!open)}>
      {displayContent()}
      {value || placeholder || children}
      <span className={open ? 'rotate-180' : ''}>▼</span>{' '}
    </button>
  );
};

export default DropdownTrigger;
