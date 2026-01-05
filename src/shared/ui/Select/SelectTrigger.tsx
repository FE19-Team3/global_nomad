'use client';
import ChevronDownIcon from '@/shared/assets/icons/ChevronDownIcon.svg';
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

      <ChevronDownIcon className={cn(slots.icon(), open && 'scale-x-[-1]')} />
    </button>
  );
};
