import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ActivityList } from '@/widgets/activity/activity-list';
import type { ActivityCardItem } from '@/widgets/activity/model/activity-card.types';

const baseActivity = {
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
    title: '피오르 체험',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    imageUrl:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    ...baseActivity,
  },
  {
    id: 2,
    title: '해안가 마을에서 1주일',
    rating: 4.5,
    reviewCount: 86,
    price: 217000,
    imageUrl:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    ...baseActivity,
  },
  {
    id: 3,
    title: '부모님과 함께 갈대숲 체험',
    rating: 4.1,
    reviewCount: 113,
    price: 6000,
    imageUrl:
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1200&q=80',
    ...baseActivity,
  },
  {
    id: 4,
    title: '열기구 페스티벌',
    rating: 4.1,
    reviewCount: 85,
    price: 35000,
    imageUrl:
      'https://images.unsplash.com/photo-1508264165352-258859e62245?auto=format&fit=crop&w=1200&q=80',
    ...baseActivity,
  },
  {
    id: 5,
    title: '로컬 자전거 투어',
    rating: 3.9,
    reviewCount: 108,
    price: 42800,
    imageUrl:
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80',
    ...baseActivity,
  },
  {
    id: 6,
    title: '이미지 없는 체험 예시',
    rating: 4.2,
    reviewCount: 12,
    price: 12000,
    ...baseActivity,
  },
];

const meta: Meta<typeof ActivityList> = {
  title: 'Widgets/Activity/ActivityList',
  component: ActivityList,
  args: {
    experiences: MOCK_ACTIVITIES,
    limit: 5,
  },
};

export default meta;
type Story = StoryObj<typeof ActivityList>;

export const Default: Story = {};

export const WithoutLimit: Story = {
  args: {
    limit: undefined,
    experiences: [...MOCK_ACTIVITIES, ...MOCK_ACTIVITIES],
  },
};
