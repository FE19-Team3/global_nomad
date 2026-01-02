'use client';
import React from 'react';

import { PopoverProvider } from './PopoverProvider';
interface PopoverProps {
  children: React.ReactNode;
}
export const Popover = ({ children }: PopoverProps) => {
  return <PopoverProvider>{children}</PopoverProvider>;
};
