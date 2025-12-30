'use client';
import { cn } from '@/shared/lib/cn';

import { styles } from './Select.styles';
import { SelectTriggerProps } from './Select.types';
import { useSelectContext } from './SelectContext';
export const SelectTrigger = ({ className, placeholder }: SelectTriggerProps) => {
  const { value, open, triggerRef, onOpenChange, disabled } = useSelectContext();
  const slots = styles({ isOpen: open });
  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      disabled={disabled}
      onClick={() => onOpenChange(!open)}
      className={cn(slots.trigger(), className)}
    >
      <span className={value ? slots.value() : slots.placeholder()}>{value || placeholder}</span>

      <svg className={slots.icon()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};
