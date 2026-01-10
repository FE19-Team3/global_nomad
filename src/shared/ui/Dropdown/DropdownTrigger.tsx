'use client';

import { ReactNode } from 'react';

import ChevronDownIcon from '@/shared/assets/icons/ic_chevr_on_down.svg';
import { cn } from '@/shared/lib/cn';

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
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      onClick={() => {
        onOpenChange(!open);
        if (!open) {
          setTimeout(() => {
            const firstOption = document.querySelector('[role="option"]') as HTMLElement | null;
            firstOption?.focus();
          });
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenChange(!open);
        }
        if (e.key === 'Escape') {
          onOpenChange(false);
        }
      }}
      className={styles.trigger()}
    >
      <span>{displayContent()}</span>
      <ChevronDownIcon className={cn(styles.icon(), open && 'scale-x-[-1]')} />
    </button>
  );
};

export default DropdownTrigger;
