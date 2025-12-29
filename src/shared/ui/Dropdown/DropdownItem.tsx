'use client';

import { ReactNode } from 'react';

import { useDropdown } from './DropdownContext';

interface DropdownItemProps {
  children: ReactNode;
  value: string;
  onClick?: () => void;
  className?: string;
}

const DropdownItem = ({ children, value, onClick, className }: DropdownItemProps) => {
  const { onValueChange } = useDropdown();

  const handleClick = () => {
    onValueChange?.(value);
    onClick?.();
  };

  return (
    <li onClick={handleClick} className={className}>
      {children}
    </li>
  );
};

export default DropdownItem;
