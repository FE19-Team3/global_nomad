'use client';

import { ReactNode } from 'react';

import { useDropdown } from './DropdownContext';

interface DropdownTriggerProps {
  children?: ReactNode;
  placeholder?: string;
}

const DropdownTrigger = ({ children, placeholder }: DropdownTriggerProps) => {
  const { open, onOpenChange, selectedLabel, styles } = useDropdown();

  const displayContent = () => {
    if (selectedLabel) return selectedLabel; // 1순위: 선택된 label(한글)
    if (children) return children; // 2순위: 커스텀 컨텐츠
    return placeholder; // 3순위: placeholder
  };

  return (
    <button onClick={() => onOpenChange(!open)} className={styles.trigger()}>
      <span>{displayContent()}</span>
      <span className={styles.icon()}>▼</span>
    </button>
  );
};

export default DropdownTrigger;
