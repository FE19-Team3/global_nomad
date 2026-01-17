import { ReactNode } from 'react';

import { styles } from './BottomSheet.styles';

export const BottomSheetContent = ({ children }: { children: ReactNode }) => {
  const slots = styles();
  return (
    <div className={slots.content()} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
