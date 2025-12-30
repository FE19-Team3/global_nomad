'use client';

import { ReactNode } from 'react';

import { useDropdown } from './DropdownContext';

interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const { open, styles } = useDropdown();

  if (!open) return null;

  return <ul className={styles.menu()}>{children}</ul>;
};

export default DropdownMenu;
