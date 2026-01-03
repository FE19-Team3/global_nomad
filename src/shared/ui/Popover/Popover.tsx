'use client';
import React from 'react';

import PopoverProvider from './PopoverProvider';

interface PopoverProps {
  children: React.ReactNode;
}
const Popover = ({ children }: PopoverProps) => {
  return <PopoverProvider>{children}</PopoverProvider>;
};

export default Popover;
