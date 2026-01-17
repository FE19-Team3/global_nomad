'use client';

import { useState } from 'react';

import { CategoryCheckBoxGroup } from '@/features/filter/category/ui/CategoryCheckBoxGroup';
import Reset from '@/shared/assets/icons/ic_refresh.svg';
import { ActivityCategory, ActivitySort } from '@/shared/constants/activity';
import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';
import SortDropdown from '@/widgets/main/SortDropdown';

interface Props {
  selectedCategory?: ActivityCategory;
  selectedSort: ActivitySort['values'];
  setSelectedCategory: React.Dispatch<React.SetStateAction<ActivityCategory | undefined>>;
  setSelectedSort: (value: ActivitySort['values']) => void;
}

export const ListHeader = ({
  selectedCategory,
  selectedSort,
  setSelectedCategory,
  setSelectedSort,
}: Props) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleReset = () => {
    setSelectedCategory(undefined);
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 250);
  };
  return (
    <section className="w-full border-b border-gray-100 mb-5">
      <div className="py-3 space-y-3">
        <div className="flex items-center justify-between">
          <Text.B18 as="h2" className="md:text-[32px] md:font-bold">
            🛼 모든 체험
          </Text.B18>
          <div className="min-[744px]:hidden">
            <SortDropdown selected={selectedSort} setSelected={setSelectedSort} />
          </div>
        </div>

        {/* 카테고리 + 가격 (PC) */}
        <div className="flex items-center justify-between gap-3 min-w-0">
          <div className="flex gap-3 items-center min-w-0 ">
            <Button
              variant="secondary"
              iconOnly
              radius="full"
              onClick={handleReset}
              aria-label="필터 초기화"
              className="w-12 h-12 shrink-0"
            >
              <Reset
                className={isSpinning ? 'animate-spin' : ''}
                style={{ animationDuration: '0.5s' }}
              />
            </Button>
            <CategoryCheckBoxGroup selected={selectedCategory} setSelected={setSelectedCategory} />
          </div>

          <div className="max-[743px]:hidden shrink-0">
            <SortDropdown selected={selectedSort} setSelected={setSelectedSort} />
          </div>
        </div>
      </div>
    </section>
  );
};
