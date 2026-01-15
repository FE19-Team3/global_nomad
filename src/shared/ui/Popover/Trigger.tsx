'use client';

import React from 'react';

import { cn } from '@/shared/lib/cn';

import { usePopover } from './PopoverContext';

interface PopoverTriggerProps {
  children: React.ReactNode;
  popoverKey: string;
  label?: string;
  className?: string;
}
const PopoverTrigger = ({ children, className, popoverKey, label }: PopoverTriggerProps) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const { activeKey, toggle } = usePopover();

  const isActive = activeKey === popoverKey;

  const handleClick = () => {
    // TODO: 키보드 접근성 추가(Esc)
    if (triggerRef.current) {
      toggle(popoverKey, triggerRef.current);
    }
  };

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="true"
      aria-expanded={isActive}
      onClick={handleClick}
      className={cn('cursor-pointer', className)}
      aria-label={label}
    >
      {children}
    </button>
  );
};
export default PopoverTrigger;
