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
  icon?: string; // TODO: SVGIcon 컴포넌트 추가후, 타입 변경
  placeholder?: string;
  radius?: 'md' | 'lg';
  size?: 'md' | 'lg';
  type?: 'text' | 'password';
  value?: string;
  variant?: 'primary' | 'secondary';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled = false,
      error = false,
      errorMsg = '',
      icon = '',
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
      input,
      error: errorClass,
    } = styles({
      size,
      variant,
      radius,
      disabled,
      error: error,
      hasIcon: !!icon,
    });

    return (
      <div className={container()}>
        {icon && (
          <div className={iconWrapper()}>
            <img src="/file.svg" alt="아이콘" className="w-6 h-6" />{' '}
            {/* TODO: SVGIcon 컴포넌트 추가 후, 형태 변경 */}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(input(), className)}
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
