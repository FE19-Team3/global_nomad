import { CatecoryCheckBoxGroup } from '@/features/filter/category/ui/CatecoryCheckBoxGroup';
import Text from '@/shared/ui/Text';

export const ListHeader = () => {
  return (
    <section className="w-full border-b border-gray-100">
      <div className="px-4 py-3 space-y-3">
        {/* 타이틀 */}
        <div className="flex items-center justify-between">
          <Text.B32>🛼모든 체험</Text.B32>
          {/* 가격 (모바일에서만 표시) */}
          <button type="button" className="text-sm text-gray-700 min-[744px]:hidden">
            가격 ▾
          </button>
        </div>

        {/* 카테고리 + 가격 (PC) */}
        <div className="flex items-center gap-3">
          <CatecoryCheckBoxGroup />
          {/* 가격 (PC에서만 표시) */}
          <button type="button" className="shrink-0 text-sm text-gray-700 max-[743px]:hidden">
            가격 ▾
          </button>
        </div>
      </div>
    </section>
  );
};
