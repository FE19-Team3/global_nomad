'use client';

import {
  createContext,
  useContext,
  useId,
  ReactNode,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react';

import { cn } from '@/shared/lib/cn';

interface RadioContextProps {
  name: string;
  selectedValue?: string;
  onChange: (value: string) => void;
}

const RadioContext = createContext<RadioContextProps | undefined>(undefined);

interface RadioProps extends RadioContextProps {
  children: ReactNode;
  className?: string;
}

const RadioMain = ({ name, selectedValue, onChange, children, className }: RadioProps) => {
  return (
    <RadioContext.Provider value={{ name, selectedValue, onChange }}>
      <div role="radiogroup" className={cn('flex flex-col gap-2', className)}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};

interface RadioItemProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'name' | 'checked' | 'onChange'
> {
  value: string;
  label: string;
  disabled?: boolean;
}

const RadioItem = ({ value, label, className, id, disabled = false, ...props }: RadioItemProps) => {
  const context = useContext(RadioContext);
  const generatedId = useId();

  if (!context) throw new Error('Radio.Item은 Radio 내부에서 사용되어야 함');

  const { name, selectedValue, onChange } = context;
  const isSelected = selectedValue === value;
  const radioId = id || generatedId;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(value);
    }
  };

  return (
    <label
      htmlFor={radioId}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-xl border px-6 py-4 transition-colors',
        'border-gray-300 text-m-14 text-gray-950',
        isSelected && 'border-primary bg-primary-100 text-b-14 text-primary border-2',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        checked={isSelected}
        onChange={handleChange}
        disabled={disabled}
        tabIndex={-1}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
};

export const Radio = Object.assign(RadioMain, {
  Item: RadioItem,
});
