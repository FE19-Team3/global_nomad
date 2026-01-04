import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BookingCard } from '@/widgets/BookingCard/BookingCard';
import { Reservation } from '@/widgets/BookingCard/BookingCard.types';

const baseReservation: Reservation = {
  id: 1,
  teamId: 'team-1',
  userId: 10,
  activity: {
    id: 100,
    title: '서핑 체험',
    bannerImageUrl: '/thumbnail.png',
  },
  scheduleId: 1,
  status: 'pending',
  reviewSubmitted: false,
  totalPrice: 50000,
  headCount: 2,
  date: '2026-01-10',
  startTime: '10:00',
  endTime: '12:00',
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
};

const meta: Meta<typeof BookingCard> = {
  title: 'Widgets/BookingCard',
  component: BookingCard,
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[700px] mx-auto p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BookingCard>;

export const Pending: Story = {
  args: {
    reservation: {
      ...baseReservation,
      status: 'pending',
    },
  },
};

export const Confirmed: Story = {
  args: {
    reservation: {
      ...baseReservation,
      status: 'confirmed',
    },
  },
};

export const Declined: Story = {
  args: {
    reservation: {
      ...baseReservation,
      status: 'declined',
    },
  },
};

export const Canceled: Story = {
  args: {
    reservation: {
      ...baseReservation,
      status: 'canceled',
    },
  },
};

export const Completed: Story = {
  args: {
    reservation: {
      ...baseReservation,
      status: 'completed',
    },
  },
};

// 모바일 전용 스토리 추가
export const MobilePending: Story = {
  args: {
    reservation: {
      ...baseReservation,
      status: 'pending',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletPending: Story = {
  args: {
    reservation: {
      ...baseReservation,
      status: 'pending',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
