'use client';

import { forwardRef, TextareaHTMLAttributes, ChangeEvent } from 'react';

import { cn } from '@/shared/lib/cn';

import { styles } from './Textarea.styles';

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange'
> {
  className?: string;
  error?: boolean;
  errorMsg?: string;
  radius?: 'md' | 'lg';
  value?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      disabled = false,
      error = false,
      errorMsg = '',
      radius = 'lg',
      value,
      onChange,
      rows = 4, // 기본 높이
      ...rest
    },
    ref,
  ) => {
    const {
      container,
      textarea,
      error: errorClass,
    } = styles({
      radius,
      disabled,
      error,
    });

    return (
      <div className={container()}>
        <textarea
          ref={ref}
          value={value}
          disabled={disabled}
          rows={rows}
          className={cn(textarea(), className)}
          onChange={onChange}
          {...rest}
        />
        {error && errorMsg && <span className={errorClass()}>{errorMsg}</span>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export default Textarea;
