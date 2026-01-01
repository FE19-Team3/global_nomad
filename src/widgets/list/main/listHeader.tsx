import { CatecoryRadioGroup } from '@/features/filter/category/ui/CategoryRadioGroup';
import Text from '@/shared/ui/Text';

export const ListHeader = () => {
  return (
    <section className="w-full border-b border-gray-100">
      <div className="px-4 py-3 space-y-3">
        {/*타이틀*/}
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Text.B32>🛼모든 체험</Text.B32>
          </div>

          {/* 가격 (모바일에서만 여기 표시) */}
          <button type="button" className="ml-auto text-sm text-gray-700 hidden max-[743px]:block">
            가격 ▾
          </button>
        </div>
        <div className="flex items-center gap-3">
          {/* 카테고리*/}
          <CatecoryRadioGroup />
          {/* 가격 (744px 이상에서만 여기 표시) */}
          <button type="button" className="shrink-0 text-sm text-gray-700 hidden min-[744px]:block">
            가격 ▾
          </button>
        </div>
      </div>
    </section>
  );
};
