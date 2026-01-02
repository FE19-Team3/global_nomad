import { ActivityList } from '@/widgets/activity/activity-list';

import MainHero from './ui/MainHero';

// Mock 데이터
const MOCK_DATA = [
  { id: 1, title: '함께 배우면 즐거운 스트릿 댄스', rating: 3.9, reviewCount: 108, price: 42800 },
  { id: 2, title: '연인과 사랑의 징검다리', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 3, title: '피오르 체험', rating: 3.9, reviewCount: 108, price: 42800 },
  { id: 4, title: '해안가 마을에서 1주일  ', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 5, title: '부모님과 함께 갈대숲 체험', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 6, title: '함께 배우면 즐거운 스트릿 댄스', rating: 3.9, reviewCount: 108, price: 42800 },
  { id: 7, title: '연인과 사랑의 징검다리', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 8, title: '피오르 체험', rating: 3.9, reviewCount: 108, price: 42800 },
  { id: 9, title: '해안가 마을에서 1주일  ', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 10, title: '부모님과 함께 갈대숲 체험', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 11, title: '함께 배우면 즐거운 스트릿 댄스', rating: 3.9, reviewCount: 108, price: 42800 },
  { id: 12, title: '연인과 사랑의 징검다리', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 13, title: '피오르 체험', rating: 3.9, reviewCount: 108, price: 42800 },
  { id: 14, title: '해안가 마을에서 1주일  ', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 15, title: '부모님과 함께 갈대숲 체험', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 16, title: '함께 배우면 즐거운 스트릿 댄스', rating: 3.9, reviewCount: 108, price: 42800 },
  { id: 17, title: '연인과 사랑의 징검다리', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 18, title: '피오르 체험', rating: 3.9, reviewCount: 108, price: 42800 },
  { id: 19, title: '해안가 마을에서 1주일  ', rating: 4.5, reviewCount: 86, price: 55000 },
  { id: 20, title: '부모님과 함께 갈대숲 체험', rating: 4.5, reviewCount: 86, price: 55000 },
];

const MainPage = () => {
  return (
    <main className="mx-auto max-w-346 px-8 py-26 flex flex-col gap-20">
      <MainHero />
      <section className="flex flex-col gap-6">
        <h2 className="text-b-32 text-gray-950">🛼 모든 체험</h2>
        <ActivityList experiences={MOCK_DATA} />
      </section>
    </main>
  );
};

export default MainPage;
