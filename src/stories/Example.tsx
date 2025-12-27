'use client';
import React from 'react';
export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'disabled' | 'onClick'
> {
  className?: string;
  disabled?: boolean;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  onClick: React.MouseEventHandler<HTMLElement>;
}

const Button = ({
  className,
  disabled = false,
  label,
  size = 'md',
  variant = 'primary',
  rounded = 'lg',
  onClick,
}: ButtonProps) => {
  const base = 'cursor-pointer transition-all duration-150 rounded-full';
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-1.5 text-md',
    lg: 'px-5 py-2 text-lg',
  };
  const variants = {
    primary: 'bg-blue-300 text-gray-900 hover:bg-blue-400',
    secondary: 'bg-white text-gray-900 border border-gray300 hover:bg-gray-200',
    tertiary: 'bg-purple-200 text-purple-900 hover:bg-purple-300',
  };
  const roundeds = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${roundeds[rounded]}`;
  return (
    <button className={`${classes} ${className}`} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};
export default Button;
