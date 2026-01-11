'use client';

import { useId } from 'react';

import Input from '@/shared/ui/Input/Input';
import type { InputProps } from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';

interface LabeledInputProps extends Omit<InputProps, 'onChange'> {
  label: string;
}

export const LabeledInput = ({
  label,
  className,
  disabled,
  error,
  errorMsg,
  placeholder,
  type,
  value,
  variant,
  children,
  ...rest
}: LabeledInputProps) => {
  const id = useId();

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
        {...rest}
      />
      {children}
    </div>
  );
};
