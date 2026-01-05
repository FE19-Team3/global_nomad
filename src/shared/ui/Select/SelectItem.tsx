'use client';
import { styles } from './Select.styles';
import { SelectItemProps } from './Select.types';
import { useSelectContext } from './SelectContext';
export const SelectItem = ({ children, value, disabled }: SelectItemProps) => {
  const { onValueChange, value: selectedValue } = useSelectContext();
  const isSelected = selectedValue === value;
  const slots = styles({ isSelected: isSelected, isDisabled: disabled });
  const handleClick = () => {
    if (disabled) return;
    onValueChange(value);
  };
  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      onClick={handleClick}
      className={slots.item()}
    >
      {children}
    </div>
  );
};
