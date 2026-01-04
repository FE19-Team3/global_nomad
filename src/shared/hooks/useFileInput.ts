import { useRef } from 'react';

export const useFileInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  const open = () => {
    ref.current?.click();
  };

  const reset = () => {
    if (ref.current) ref.current.value = '';
  };

  return {
    ref,
    open,
    reset,
  };
};
