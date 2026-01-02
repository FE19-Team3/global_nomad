import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import NotificationModal, { Notification } from '@/widgets/notification/NotificationModal';

const mockItems: Notification[] = [
  {
    id: '1',
    content: '예약이 승인되었어요.',
    createdAt: '2026-01-02T18:20:00.000Z',
    read: false,
  },
  {
    id: '2',
    content: '예약이 거절되었어요.',
    createdAt: '2026-01-02T18:10:00.000Z',
    read: true,
  },
  {
    id: '3',
    content: '새로운 알림이 도착했어요.',
    createdAt: '2026-01-02T17:50:00.000Z',
    read: false,
  },
];

const meta: Meta<typeof NotificationModal> = {
  title: 'Widgets/NotificationModal',
  component: NotificationModal,
  decorators: [
    (Story) => (
      <div className="relative w-full h-[600px] p-10 bg-gray-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NotificationModal>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    items: mockItems,
  },
};

export const Empty: Story = {
  args: {
    open: true,
    onClose: () => {},
    items: [],
  },
};
