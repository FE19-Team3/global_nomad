'use client';
import ChevronDownIcon from '@/shared/assets/icons/ic_chevron_down.svg';
import { cn } from '@/shared/lib/cn';

import { styles } from './Select.styles';
import { SelectTriggerProps } from './Select.types';
import { useSelectContext } from './SelectContext';
export const SelectTrigger = ({
  className,
  placeholder,
  variant,
  displayValue,
}: SelectTriggerProps) => {
  const { value, open, triggerRef, onOpenChange, disabled } = useSelectContext();
  const slots = styles({ isOpen: open, variant: variant });
  const resolvedValue = displayValue ?? value;
  const hasValue = Boolean(resolvedValue);
  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      disabled={disabled}
      onClick={() => onOpenChange(!open)}
      className={cn(slots.trigger(), className)}
    >
      <span className={hasValue ? slots.value() : slots.placeholder()}>
        {hasValue ? resolvedValue : placeholder}
      </span>

      <ChevronDownIcon className={cn(slots.icon(), open && 'scale-x-[-1]')} />
    </button>
  );
};
