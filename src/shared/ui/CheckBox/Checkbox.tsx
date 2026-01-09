'use client';

import { ChangeEvent, ReactNode, useId } from 'react';

import { cn } from '@/shared/lib/cn';

import { checkboxStyles } from './styles';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
};

export const Checkbox = ({ checked, onChange, label, icon, disabled = false }: CheckboxProps) => {
  const id = useId();
  const styles = checkboxStyles({ checked, disabled });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label
      htmlFor={id}
      className={cn(styles.root())}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled) onChange(!checked);
        }
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.input()}
        tabIndex={-1}
      />

      {icon && (
        <span aria-hidden className={styles.icon()}>
          {icon}
        </span>
      )}

      <span className={styles.label()}>{label}</span>
    </label>
  );
};
