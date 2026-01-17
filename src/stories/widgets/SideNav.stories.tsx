import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SideNav } from '@/widgets/side-nav/ui/side-nav';

const meta = {
  title: 'Widgets/SideNav',
  component: SideNav,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/side',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[384px] min-h-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof SideNav>;

export const Default: Story = {};

export const WithProfileImage: Story = {};

export const BookingPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/booking',
      },
    },
  },
};

export const MyExperiencePage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/my-activities',
      },
    },
  },
};

export const BookingStatusPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/booking-status',
      },
    },
  },
};
