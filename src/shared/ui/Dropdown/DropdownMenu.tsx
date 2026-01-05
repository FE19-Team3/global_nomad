'use client';

import { ReactNode, useRef } from 'react';

import { useDropdown } from './DropdownContext';

interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const { open, styles } = useDropdown();
  const menuRef = useRef<HTMLUListElement>(null);

  if (!open) return null;

  return (
    <ul
      className={styles.menu()}
      role="listbox"
      ref={menuRef}
      tabIndex={-1}
      onKeyDown={(e) => {
        const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="option"]');
        if (!items || items.length === 0) return;

        const currentIndex = Array.from(items).findIndex((item) => item === document.activeElement);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = items[currentIndex + 1] ?? items[0];
          next.focus();
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = items[currentIndex - 1] ?? items[items.length - 1];
          prev.focus();
        }
      }}
    >
      {children}
    </ul>
  );
};

export default DropdownMenu;
