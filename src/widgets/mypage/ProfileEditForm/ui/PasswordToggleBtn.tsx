import { MouseEvent } from 'react';

import InvisibleIcon from '@/shared/assets/icons/InvisibleIcon.svg';
import VisibleIcon from '@/shared/assets/icons/VisibleIcon.svg';
import { cn } from '@/shared/lib/cn';

type PasswordToggleButtonProps = {
  visible: boolean;
  onToggle: () => void;
  className?: string;
};

const PasswordToggleBtn = ({ visible, onToggle, className }: PasswordToggleButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex items-center text-gray-500 justify-center hover:cursor-pointer absolute top-11 right-5',
        className,
      )}
      aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보이기'}
    >
      {visible ? <VisibleIcon className="w-5 h-5" /> : <InvisibleIcon className="w-5 h-5" />}
    </button>
  );
};

export default PasswordToggleBtn;
