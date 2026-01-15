import { ReactNode } from 'react';

import { styles } from './BottomSheet.styles';
export const BottomSheetFooter = ({ children }: { children: ReactNode }) => {
  const slots = styles();
  return <div className={slots.footer()}>{children}</div>;
};
