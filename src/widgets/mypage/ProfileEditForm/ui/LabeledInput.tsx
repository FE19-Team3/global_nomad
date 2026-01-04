'use client';

import { ChangeEvent, useId } from 'react';

import Input from '@/shared/ui/Input/Input';
import type { InputProps } from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';

interface LabeledInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export const LabeledInput = ({
  label,
  className,
  disabled,
  error,
  onChange,
  errorMsg,
  placeholder,
  type,
  value,
  variant,
  children,
  ...rest
}: LabeledInputProps) => {
  const id = useId();
  const voidFn = () => {};

  return (
    <div className="flex flex-col relative">
      <Label className="mb-2" htmlFor={id} textSize="16_M">
        {label}
      </Label>
      <Input
        id={id}
        className={className}
        disabled={disabled}
        error={error}
        errorMsg={errorMsg}
        placeholder={placeholder}
        type={type}
        value={value}
        variant={variant}
        onChange={onChange ? onChange : voidFn}
        {...rest}
      />
      {children}
    </div>
  );
};
