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
    <li onClick={handleClick} className={styles.item({ selected: isSelected })}>
      {children}
    </li>
  );
};

export default DropdownItem;
