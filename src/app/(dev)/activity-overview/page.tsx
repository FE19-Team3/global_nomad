import type { ActivityDetail } from '@/features/activity/activity-detail/model/activity-detail.types';
import { ActivityOverview } from '@/widgets/activity/activity-detail-header';

const MOCK_EXPERIENCE: ActivityDetail = {
  id: 1,
  category: '문화 · 예술',
  title: '함께 배우면 즐거운 스트릿 댄스',
  rating: 4.9,
  reviewCount: 293,
  address: '서울 중구 청계천로 100 10F',
  bannerImageUrl: '/sub1.png',
  description: '초보자부터 전문가까지 춤추는 즐거움을 함께 느껴보세요.',
  price: 0,
  userId: 1,
  subImages: [
    { id: 1, imageUrl: '/sub2.png' },
    { id: 2, imageUrl: '/sub3.png' },
  ],
  schedules: [
    {
      date: '2024-01-01',
      times: [
        { id: 1, startTime: '09:00', endTime: '10:00' },
        { id: 2, startTime: '14:00', endTime: '15:00' },
      ],
    },
  ],
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const ActivityOverviewDemoPage = () => {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-10">
      <ActivityOverview experience={MOCK_EXPERIENCE} />
    </main>
  );
};

export default ActivityOverviewDemoPage;
