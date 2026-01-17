'use client';

import { useState, PropsWithChildren, useCallback } from 'react';

import { useDismiss } from '@/shared/hooks/useDismiss';

import { PopoverContext } from './PopoverContext';

const PopoverProvider = ({ children }: PropsWithChildren) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [floatingEl, setFloatingEl] = useState<HTMLElement | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const open = useCallback((key: string, anchor: HTMLElement) => {
    setActiveKey(key);
    setAnchorEl(anchor);
  }, []);

  const close = useCallback(() => {
    setActiveKey(null);
    setAnchorEl(null);
    setFloatingEl(null);
  }, []);

  const toggle = useCallback(
    (key: string, anchor: HTMLElement) => {
      if (activeKey === key && anchorEl === anchor) close();
      else open(key, anchor);
    },
    [activeKey, anchorEl, close, open],
  );

  useDismiss({
    enabled: Boolean(activeKey),
    onDismiss: close,
    anchorEl,
    floatingEl,
  });

  return (
    <PopoverContext.Provider
      value={{ anchorEl, activeKey, floatingEl, open, close, toggle, setFloatingEl }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

export default PopoverProvider;
