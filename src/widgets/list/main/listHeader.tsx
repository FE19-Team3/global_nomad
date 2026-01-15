'use client';

import { useState } from 'react';

import { CategoryCheckBoxGroup } from '@/features/filter/category/ui/CategoryCheckBoxGroup';
import Reset from '@/shared/assets/icons/ic_refresh.svg';
import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';

interface Props {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ListHeader = ({ selected, setSelected }: Props) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleReset = () => {
    setSelected([]);
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 250);
  };
  return (
    <section className="w-full border-b border-gray-100 mb-5">
      <div className="py-3 space-y-3">
        {/* 타이틀 */}
        <div className="flex items-center justify-between">
          <Text.B18 as="h2" className="md:text-[32px] md:font-bold">
            🛼 모든 체험
          </Text.B18>
          {/* 가격 (모바일에서만 표시) */}
          <button type="button" className="text-sm text-gray-700 min-[744px]:hidden">
            가격 ▾
          </button>
        </div>

        {/* 카테고리 + 가격 (PC) */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-3 items-center overflow-x-auto">
            <Button
              variant="secondary"
              iconOnly
              radius="full"
              onClick={handleReset}
              aria-label="필터 초기화"
              className="w-12 h-12"
            >
              <Reset
                className={isSpinning ? 'animate-spin' : ''}
                style={{ animationDuration: '0.5s' }}
              />
            </Button>
            <CategoryCheckBoxGroup selected={selected} setSelected={setSelected} />
          </div>
          {/* 가격 (PC에서만 표시) */}
          <button type="button" className="text-sm text-gray-700 max-[743px]:hidden">
            가격 ▾
          </button>
        </div>
      </div>
    </section>
  );
};
