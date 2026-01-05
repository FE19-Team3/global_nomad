'use client';
import { styles } from './Select.styles';
import { SelectContentProps } from './Select.types';
import { useSelectContext } from './SelectContext';

export const SelectContent = ({ children }: SelectContentProps) => {
  const { open } = useSelectContext();
  const slots = styles();
  if (!open) return null;
  return (
    <div className={slots.content()}>
      <div className={slots.viewport()}>{children}</div>
    </div>
  );
};
