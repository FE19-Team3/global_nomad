'use client';

import { useState, PropsWithChildren, useCallback } from 'react';

import { PopoverContext } from './PopoverContext';

const PopoverProvider = ({ children }: PropsWithChildren) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const open = useCallback((key: string, anchor: HTMLElement) => {
    setActiveKey(key);
    setAnchorEl(anchor);
  }, []);

  const close = useCallback(() => {
    setActiveKey(null);
    setAnchorEl(null);
  }, []);

  const toggle = useCallback(
    (key: string, anchor: HTMLElement) => {
      if (activeKey === key && anchorEl === anchor) close();
      else open(key, anchor);
    },
    [activeKey, anchorEl, close, open],
  );

  return (
    <PopoverContext.Provider value={{ anchorEl, activeKey, open, close, toggle }}>
      {children}
    </PopoverContext.Provider>
  );
};

export default PopoverProvider;
