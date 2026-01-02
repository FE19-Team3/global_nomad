import React, { useCallback } from 'react';

import { cn } from '@/shared/lib/cn';

import { usePopover } from './PopoverContext';
interface PopoverTriggerProps {
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  popoverKey: string;
  label?: string;
  className?: string;
}
const PopoverTrigger = ({ children, className, popoverKey, label }: PopoverTriggerProps) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const { activeKey, toggle } = usePopover();

  const isActive = activeKey === popoverKey;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      children.props.onClick?.(e);
      if (triggerRef.current) {
        toggle(popoverKey, triggerRef.current);
      }
    },
    [children.props, toggle, popoverKey],
  );

  const setTriggerRef = useCallback((node: HTMLButtonElement | null) => {
    triggerRef.current = node;
  }, []);

  // 외부에서 자유로운 trigger를 받은 후, ref, props 추가하기 위해 cloneElement 사용
  // ref를 전달하는 것은 React의 정상적인 패턴이므로 ESLint 경고 무시
  // eslint-disable-next-line react-hooks/refs
  return React.cloneElement(children, {
    // trigger에 아래의 옵션들 추가
    ref: setTriggerRef,
    className: cn('cursor-pointer', className),
    role: 'button',
    'aria-label': label,
    'aria-expanded': isActive,
    'aria-haspopup': 'true',
    onClick: handleClick,
  } as React.ButtonHTMLAttributes<HTMLButtonElement>);
};
export default PopoverTrigger;
