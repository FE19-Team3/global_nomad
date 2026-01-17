'use client';
// 외부 클릭, ESC 키 입력으로 요소 닫음
import { useEffect } from 'react';

interface UseDismissOptions {
  enabled: boolean;
  onDismiss: () => void;
  anchorEl?: HTMLElement | null;
  floatingEl?: HTMLElement | null;
}

export function useDismiss({ enabled, onDismiss, anchorEl, floatingEl }: UseDismissOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;

      if (anchorEl?.contains(target) || floatingEl?.contains(target)) {
        return;
      }

      onDismiss();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, onDismiss, anchorEl, floatingEl]);
}
