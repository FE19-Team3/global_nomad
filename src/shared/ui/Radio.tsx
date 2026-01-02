'use client';

import React, { createContext, useContext, useId, ReactNode, InputHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

// Context
interface RadioContextProps {
  name: string;
  selectedValue?: string;
  onChange: (value: string) => void;
}
const RadioContext = createContext<RadioContextProps | undefined>(undefined);

// Radio 준비
interface RadioProps extends RadioContextProps {
  children: ReactNode;
  className?: string;
}

const RadioMain = ({ name, selectedValue, onChange, children, className }: RadioProps) => {
  return (
    <RadioContext.Provider value={{ name, selectedValue, onChange }}>
      <div role="radiogroup" className={cn('flex gap-2', className)}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};

// Radio.Item 준비
interface RadioItemProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'name' | 'checked' | 'onChange'
> {
  value: string;
  label?: string;
}

const RadioItem = ({ value, label, className, id, ...props }: RadioItemProps) => {
  const context = useContext(RadioContext);
  const generatedId = useId();

  if (!context) throw new Error('Radio.Item은 Radio 내부에서 사용되어야 함');

  const { name, selectedValue, onChange } = context;
  const isSelected = selectedValue === value;
  const radioId = id || generatedId;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className={cn(
          // 기본 스타일 제거
          'appearance-none w-4 h-4 border border-gray-300 rounded-full',
          // 체크되었을 때 스타일
          'checked:border-primary checked:border-4 transition-all',
          'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary',
        )}
        {...props}
      />
      {label && (
        <label htmlFor={radioId} className="cursor-pointer text-sm select-none">
          {label}
        </label>
      )}
    </div>
  );
};

// 네임스페이스로 내보내기
export const Radio = Object.assign(RadioMain, {
  Item: RadioItem,
});
