'use client';

import { useState, ReactNode } from 'react';

import { PopoverContext } from './PopoverContext';

export const PopoverProvider = ({ children }: { children: ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const open = (key: string, anchor: HTMLElement) => {
    setActiveKey(key);
    setAnchorEl(anchor);
  };

  const close = () => {
    setActiveKey(null);
    setAnchorEl(null);
  };

  const toggle = (key: string, anchor: HTMLElement) => {
    if (activeKey === key && anchorEl === anchor) close();
    else open(key, anchor);
  };

  return (
    <PopoverContext.Provider value={{ anchorEl, activeKey, open, close, toggle }}>
      {children}
    </PopoverContext.Provider>
  );
};
