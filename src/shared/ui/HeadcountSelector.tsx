'use client';

import AddIcon from '@/shared/assets/images/icons/icon-add.svg';
import MinusIcon from '@/shared/assets/images/icons/icon-minus.svg';
import { cn } from '@/shared/lib/cn';
import Text from '@/shared/ui/Text';

interface HeadcountSelectorProps {
  count: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}

export const HeadcountSelector = ({
  count,
  onChange,
  min = 1,
  max = 100,
  className,
}: HeadcountSelectorProps) => {
  const handleDecrement = () => {
    if (count > min) onChange(count - 1);
  };

  const handleIncrement = () => {
    if (count < max) onChange(count + 1);
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between w-full max-w-35 h-10 border border-gray-200 rounded-full overflow-hidden',
        className,
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={count <= min}
        className="h-full w-10 flex justify-center items-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-primary-100 enabled:hover:text-primary rounded-full transition-colors"
        aria-label="인원 감소"
      >
        <MinusIcon className="h-5 w-5" aria-hidden />
      </button>

      <Text.B16 className="text-gray-700">{count}</Text.B16>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={count >= max}
        className="h-full w-10 flex justify-center items-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-primary-100 enabled:hover:text-primary rounded-full transition-colors"
        aria-label="인원 증가"
      >
        <AddIcon className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
};
