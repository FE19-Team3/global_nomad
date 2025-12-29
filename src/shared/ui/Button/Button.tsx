'use client';

import Link, { type LinkProps } from 'next/link';
import { ComponentPropsWithoutRef, ReactNode, createContext, useContext } from 'react';

import { cn } from '@/shared/lib/cn';

import { styles } from './Button.styles';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'text'
  | 'icon'
  | 'badge'
  | 'selectable'
  | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'full';
export type ButtonRadius = 'sm' | 'md' | 'full';
export type ButtonIconSize = 'sm' | 'md' | 'md2';

// Context
interface ButtonContextValue {
  slots: ReturnType<typeof styles>;
}

const ButtonContext = createContext<ButtonContextValue | null>(null);

const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('Button.Label과 Button.Icon은 Button 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

// Base Props
interface BaseButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  iconSize?: ButtonIconSize;
  disabled?: boolean;
  selected?: boolean;
  iconOnly?: boolean;
  className?: string;
}

interface ButtonAsButton extends BaseButtonProps, ComponentPropsWithoutRef<'button'> {
  as?: 'button';
  href?: never;
}

interface ButtonAsLink extends BaseButtonProps, LinkProps {
  as: 'link';
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

// Root Component
const ButtonRoot = ({
  children,
  variant = 'primary',
  size,
  radius = 'md',
  iconSize = 'md',
  disabled = false,
  selected = false,
  iconOnly = false,
  className,
  as = 'button',
  ...props
}: ButtonProps) => {
  const slots = styles({
    variant,
    size,
    radius,
    iconSize,
    disabled,
    selected,
    iconOnly,
  });

  const contextValue: ButtonContextValue = { slots };

  if (as === 'link') {
    const linkProps = props as Omit<ButtonAsLink, keyof BaseButtonProps>;
    const { href, onClick, ...restProps } = linkProps;

    return (
      <ButtonContext.Provider value={contextValue}>
        <Link
          role="button"
          href={href}
          className={cn(slots.root(), className)}
          aria-disabled={disabled}
          onClick={disabled ? (e) => e.preventDefault() : onClick}
          tabIndex={disabled ? -1 : undefined}
          {...restProps}
        >
          {children}
        </Link>
      </ButtonContext.Provider>
    );
  }

  const buttonProps = props as ComponentPropsWithoutRef<'button'>;
  const { type = 'button', ...restButtonProps } = buttonProps;

  return (
    <ButtonContext.Provider value={contextValue}>
      <button
        type={type}
        className={cn(slots.root(), className)}
        disabled={disabled}
        {...restButtonProps}
      >
        {children}
      </button>
    </ButtonContext.Provider>
  );
};

// Label Component
interface ButtonLabelProps extends ComponentPropsWithoutRef<'span'> {
  children: ReactNode;
}

const ButtonLabel = ({ children, className, ...props }: ButtonLabelProps) => {
  const { slots } = useButtonContext();

  return (
    <span className={cn(slots.label(), className)} {...props}>
      {children}
    </span>
  );
};

// Icon Component
interface ButtonIconProps extends ComponentPropsWithoutRef<'span'> {
  children: ReactNode;
}

const ButtonIcon = ({ children, className, ...props }: ButtonIconProps) => {
  const { slots } = useButtonContext();

  return (
    <span className={cn(slots.icon(), className)} {...props}>
      {children}
    </span>
  );
};

// Export
export const Button = Object.assign(ButtonRoot, {
  Label: ButtonLabel,
  Icon: ButtonIcon,
});

export default Button;
