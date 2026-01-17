'use client';

import { forwardRef, InputHTMLAttributes, ChangeEvent } from 'react';

import { cn } from '@/shared/lib/cn';

import { styles } from './Input.styles';

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'value' | 'onChange' | 'type'
> {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  errorMsg?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  radius?: 'md' | 'lg';
  size?: 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'date';
  value?: string;
  variant?: 'primary' | 'secondary';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled = false,
      error = false,
      errorMsg = '',
      icon = '',
      rightIcon = '',
      placeholder,
      radius = 'md',
      size = 'md',
      type = 'text',
      value,
      variant = 'primary',
      onChange,
      ...rest
    },
    ref,
  ) => {
    const {
      container,
      iconWrapper,
      rightIconWrapper,
      input,
      error: errorClass,
    } = styles({
      size,
      variant,
      radius,
      disabled,
      error: error,
      hasIcon: !!icon,
      hasRightIcon: !!rightIcon,
    });

    return (
      <div className={container()}>
        {icon && <div className={iconWrapper()}>{icon}</div>}
        {rightIcon && <div className={rightIconWrapper()}>{rightIcon}</div>}
        <input
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(input(), type === 'date' && rightIcon && 'input-date', className)}
          onChange={onChange}
          {...rest}
        />
        {error && errorMsg && <span className={errorClass()}>{errorMsg}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
