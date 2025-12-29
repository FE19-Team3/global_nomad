'use client';

import { ReactNode } from 'react';

import { useDropdown } from './DropdownContext';

interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const { open } = useDropdown();

  if (!open) return null;

  return <ul className="absolute top-full left-0 w-full">{children}</ul>;
};

export default DropdownMenu;
