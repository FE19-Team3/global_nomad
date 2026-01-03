import type { Activity } from '@/entities/activity';
import { ExperienceOverview } from '@/widgets/activity/activity-detail-header';

const MOCK_EXPERIENCE: Activity = {
  id: 1,
  category: '문화 · 예술',
  title: '함께 배우면 즐거운 스트릿 댄스',
  rating: 4.9,
  reviewCount: 293,
  address: '서울 중구 청계천로 100 10F',
  description: '초보자부터 전문가까지 춤추는 즐거움을 함께 느껴보세요.',
  price: 0,
};

export default function ExperienceOverviewDemoPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-10">
      <ExperienceOverview experience={MOCK_EXPERIENCE} />
    </main>
  );
}
