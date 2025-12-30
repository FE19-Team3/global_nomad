'use client';

import { ReactNode } from 'react';

import { useDropdown } from './DropdownContext';

interface DropdownItemProps {
  children: ReactNode;
  value: string;
  onClick?: () => void;
  className?: string;
}

const DropdownItem = ({ children, value, onClick }: DropdownItemProps) => {
  const { onValueChange, value: selectedValue, styles } = useDropdown();

  const handleClick = () => {
    onValueChange?.(value, children as string);
    onClick?.();
  };

  const isSelected = selectedValue === value;

  return (
    <li
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onClick={handleClick}
      className={styles.item({ selected: isSelected })}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          (e.currentTarget.nextElementSibling as HTMLElement | null)?.focus();
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          (e.currentTarget.previousElementSibling as HTMLElement | null)?.focus();
        }
      }}
    >
      {children}
    </li>
  );
};

export default DropdownItem;
