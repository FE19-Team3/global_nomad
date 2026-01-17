'use client';

import React from 'react';

import { cn } from '@/shared/lib/cn';

import { usePopover } from './PopoverContext';

interface PopoverTriggerProps {
  children: React.ReactNode | ((ctx: { isActive: boolean }) => React.ReactNode);
  popoverKey: string;
  label?: string;
  className?: string;
}
const PopoverTrigger = ({ children, className, popoverKey, label }: PopoverTriggerProps) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const { activeKey, toggle } = usePopover();

  const isActive = activeKey === popoverKey;

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="menu"
      aria-expanded={isActive}
      onClick={() => {
        if (triggerRef.current) toggle(popoverKey, triggerRef.current);
      }}
      className={cn('cursor-pointer', className)}
      aria-label={label}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </button>
  );
};
export default PopoverTrigger;
