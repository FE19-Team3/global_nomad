'use client';

import { ActivityListResponse } from '@/features/activity/activity-list/schema/activity-list.schema';
import { useActivityOffsetList } from '@/features/activity/hooks/useActivityOffsetList';
import Text from '@/shared/ui/Text';
import MainHero from '@/widgets/main/MainHero';

import AllSection from './AllSection';
import PopularSection from './PopularSection';

// TODO: 실제 데이터로 교체
// const BASE_ACTIVITY = {
//   category: '투어',
//   address: '서울특별시 강남구 테헤란로 427',
//   bannerImageUrl:
//     'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
// } satisfies Omit<
//   ActivityCardItem,
//   'id' | 'title' | 'rating' | 'reviewCount' | 'price' | 'imageUrl'
// >;

const MainContent = ({ initialData }: { initialData: ActivityListResponse }) => {
  const { activities } = useActivityOffsetList({
    // isLoading, isError 상태 추가
    page: 1,
    size: 20,
    initialData,
  });

  return (
    <main className="flex-1 mx-auto w-full max-w-350 px-6 py-26 md:px-10">
      <div className="mb-11">
        <MainHero />
      </div>
      {/* 검색 */}
      <section className="flex flex-col items-center gap-9 mb-7 py-8 px-10">
        <Text.B16 as="h2" className="md:text-[32px] md:font-bold">
          무엇을 체험하고 싶으신가요?
        </Text.B16>
        {/* <SearchInput /> */}
        <div className="w-full border h-17.5" />
      </section>
      <div>
        {/* 인기 체험 */}
        <section className="mb-15">
          <Text.B18 as="h2" className="md:text-[32px] md:font-bold">
            🔥 인기 체험
          </Text.B18>{' '}
          {/* 왜 classname 적용 안되지*/}
          <PopularSection />
        </section>
        {/* 모든 체험 */}
        <section>
          <Text.B18 as="h2" className="md:text-[32px] md:font-bold">
            🛼 모든 체험
          </Text.B18>
          {/* <AllSection /> */}
          <div className="mt-8">
            <AllSection activities={activities} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default MainContent;
