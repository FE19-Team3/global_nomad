import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ReviewCard } from '@/widgets/review-card';

const meta: Meta<typeof ReviewCard> = {
  title: 'Widgets/ReviewCard',
  component: ReviewCard,
};

export default meta;

type Story = StoryObj<typeof ReviewCard>;

export const RatingFive: Story = {
  args: {
    nickname: '여행자김',
    rating: 5,
    content: '정말 만족스러운 여행이었습니다!',
    createdAt: '2024-05-02',
  },
};

export const RatingThree: Story = {
  args: {
    nickname: '주말여행객',
    rating: 3,
    content: '무난한 투어였어요.',
    createdAt: '2024-06-01',
  },
};

export const LongContent: Story = {
  args: {
    nickname: '소확행러',
    rating: 4,
    content:
      '전체적으로 만족스러웠지만 이동 시간이 조금 길게 느껴졌습니다. 그래도 방문한 장소들은 정말 인상 깊었어요.',
    createdAt: '2024-05-18',
  },
};
