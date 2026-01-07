/* eslint-disable */

'use client';
import { Placement } from '@floating-ui/react-dom';
import React from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/cn';

import { usePopover } from './PopoverContext';
import { usePopoverPosition } from './usePopoverPosition';

interface PopoverContentProps {
  children: React.ReactNode;
  popoverKey: string;
  placement?: Placement;
  className?: string;
}

const PopoverContent = ({
  children,
  popoverKey,
  placement = 'top',
  className,
}: PopoverContentProps) => {
  const { activeKey, anchorEl } = usePopover();

  const triggerRef = anchorEl ?? null;
  const isActive = activeKey === popoverKey;

  const { refs, floatingStyles } = usePopoverPosition(triggerRef, isActive, placement);

  if (!isActive) return null;

  const portalEl = typeof window !== 'undefined' ? document.body : null;

  return portalEl
    ? createPortal(
        <div
          // floating-ui의 ref callback은 이렇게 사용하도록 설계됨
          // eslint-disable-next-line react-hooks/refs
          ref={refs.setFloating}
          style={floatingStyles}
          className={cn('m-1 z-50 rounded-md border bg-white shadow-sm', className)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>,
        portalEl,
      )
    : null;
};

export default PopoverContent;
