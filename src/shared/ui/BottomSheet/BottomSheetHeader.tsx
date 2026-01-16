// BottomSheetHeader.tsx
import { ReactNode } from 'react';

import IconBack from '@/shared/assets/icons/ic_back.svg';

import { styles } from './BottomSheet.styles';

interface HeaderProps {
  children: ReactNode;
  onBack?: () => void;
}

export const BottomSheetHeader = ({ children, onBack }: HeaderProps) => {
  const s = styles();
  return (
    <div className={s.header()}>
      {onBack && (
        <button onClick={onBack} className="p-1 -ml-2 mr-1" title="뒤로 가기">
          <IconBack />
        </button>
      )}
      <h2 className={s.title()}>{children}</h2>
    </div>
  );
};
