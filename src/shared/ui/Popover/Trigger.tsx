import React, { useCallback, useRef } from 'react';

import { usePopover } from './PopoverContext';

interface PopoverTriggerProps {
  children: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & { ref: React.Ref<HTMLButtonElement> },
  ) => React.ReactNode;
  popoverKey: string;
  label?: string;
  className?: string;
  onClick?: () => void;
}
const PopoverTrigger = ({
  children,
  popoverKey,
  label,
  className,
  onClick,
}: PopoverTriggerProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { activeKey, toggle } = usePopover();

  const isActive = activeKey === popoverKey;

  const handleClick = useCallback(() => {
    onClick?.();
    if (triggerRef.current) {
      toggle(popoverKey, triggerRef.current);
    }
  }, [onClick, toggle, popoverKey]);

  return (
    <>
      {children({
        ref: triggerRef,
        role: 'button',
        className: className,
        'aria-label': label,
        'aria-expanded': isActive,
        'aria-haspopup': 'true',
        onClick: handleClick,
      })}
    </>
  );
};
export default PopoverTrigger;
