import Text from '@/shared/ui/Text';
import type { ActivityCardItem } from '@/widgets/activity/model/activity-card.types';
import { ActivityList } from '@/widgets/main';
import MainHero from '@/widgets/main/MainHero';

import PopularSection from './PopularSection';

// TODO: 실제 데이터로 교체
const BASE_ACTIVITY = {
  category: '투어',
  address: '서울특별시 강남구 테헤란로 427',
  bannerImageUrl:
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
} satisfies Omit<
  ActivityCardItem,
  'id' | 'title' | 'rating' | 'reviewCount' | 'price' | 'imageUrl'
>;

const MOCK_ACTIVITIES: ActivityCardItem[] = [
  {
    id: 1,
    title: '함께 배우면 즐거운 스트릿 댄스',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    imageUrl:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    ...BASE_ACTIVITY,
  },
  {
    id: 2,
    title: '연인과 사랑의 징검다리',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    imageUrl:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    ...BASE_ACTIVITY,
  },
  {
    id: 3,
    title: '피오르 체험',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    imageUrl:
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1200&q=80',
    ...BASE_ACTIVITY,
  },
  {
    id: 4,
    title: '해안가 마을에서 1주일  ',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    imageUrl:
      'https://images.unsplash.com/photo-1508264165352-258859e62245?auto=format&fit=crop&w=1200&q=80',
    ...BASE_ACTIVITY,
  },
  {
    id: 5,
    title: '부모님과 함께 갈대숲 체험',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    imageUrl:
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80',
    ...BASE_ACTIVITY,
  },
  {
    id: 6,
    title: '함께 배우면 즐거운 스트릿 댄스',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    ...BASE_ACTIVITY,
  },
  {
    id: 7,
    title: '연인과 사랑의 징검다리',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    ...BASE_ACTIVITY,
  },
  {
    id: 8,
    title: '피오르 체험',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    ...BASE_ACTIVITY,
  },
  {
    id: 9,
    title: '해안가 마을에서 1주일  ',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    ...BASE_ACTIVITY,
  },
  {
    id: 10,
    title: '부모님과 함께 갈대숲 체험',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    ...BASE_ACTIVITY,
  },
  {
    id: 11,
    title: '함께 배우면 즐거운 스트릿 댄스',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    ...BASE_ACTIVITY,
  },
  {
    id: 12,
    title: '연인과 사랑의 징검다리',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    ...BASE_ACTIVITY,
  },
  {
    id: 13,
    title: '피오르 체험',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    ...BASE_ACTIVITY,
  },
  {
    id: 14,
    title: '해안가 마을에서 1주일  ',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    ...BASE_ACTIVITY,
  },
  {
    id: 15,
    title: '부모님과 함께 갈대숲 체험',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    ...BASE_ACTIVITY,
  },
  {
    id: 16,
    title: '함께 배우면 즐거운 스트릿 댄스',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    ...BASE_ACTIVITY,
  },
  {
    id: 17,
    title: '연인과 사랑의 징검다리',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    ...BASE_ACTIVITY,
  },
  {
    id: 18,
    title: '피오르 체험',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    ...BASE_ACTIVITY,
  },
  {
    id: 19,
    title: '해안가 마을에서 1주일  ',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    ...BASE_ACTIVITY,
  },
  {
    id: 20,
    title: '부모님과 함께 갈대숲 체험',
    rating: 4.5,
    reviewCount: 86,
    price: 55000,
    ...BASE_ACTIVITY,
  },
];

const MainContent = () => {
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
            <ActivityList activities={MOCK_ACTIVITIES} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default MainContent;
