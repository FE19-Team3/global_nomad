import { ReactNode } from 'react';

export interface SelectContextValue {
  value: string;
  open: boolean;
  disabled: boolean;
  onValueChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export interface SelectRootProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export interface SelectTriggerProps {
  className?: string;
  placeholder?: string;
}

export interface SelectContentProps {
  children: ReactNode;
}

export interface SelectItemProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
}
