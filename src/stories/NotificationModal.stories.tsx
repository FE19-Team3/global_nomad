import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { NotificationEntity } from '@/entities/notification/model/notification.type';
import NotificationModal from '@/widgets/notification/NotificationModal';

const meta = {
  title: 'Widgets/NotificationModal',
  component: NotificationModal,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="relative w-[400px] h-0 flex items-start justify-end p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockNotifications: NotificationEntity[] = [
  {
    id: 1,
    type: 'confirmed',
    title: '예약 승인',
    activityName: '함께하면 즐거운 스트릿 댄스',
    dateTime: '2023-01-14 15:00~18:00',
    createdAt: new Date(Date.now() - 60000), // 1분 전
    raw: '함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었습니다.',
  },
  {
    id: 2,
    type: 'declined',
    title: '예약 거절',
    activityName: '함께하면 즐거운 스트릿 댄스',
    dateTime: '2023-01-14 15:00~18:00',
    createdAt: new Date(Date.now() - 420000), // 7분 전
    raw: '함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 거절되었습니다.',
  },
  {
    id: 3,
    type: 'confirmed',
    title: '예약 승인',
    activityName: '서울 야경 투어',
    dateTime: '2023-01-15 18:00~20:00',
    createdAt: new Date(Date.now() - 3600000), // 1시간 전
    raw: '서울 야경 투어(2023-01-15 18:00~20:00) 예약이 승인되었습니다.',
  },
  {
    id: 4,
    type: 'declined',
    title: '예약 거절',
    activityName: '강남 맛집 투어',
    dateTime: '2023-01-16 12:00~14:00',
    createdAt: new Date(Date.now() - 86400000), // 1일 전
    raw: '강남 맛집 투어(2023-01-16 12:00~14:00) 예약이 거절되었습니다.',
  },
  {
    id: 5,
    type: 'confirmed',
    title: '예약 승인',
    activityName: '한강 자전거 라이딩',
    dateTime: '2023-01-17 14:00~16:00',
    createdAt: new Date(Date.now() - 604800000), // 1주 전
    raw: '한강 자전거 라이딩(2023-01-17 14:00~16:00) 예약이 승인되었습니다.',
  },
  {
    id: 6,
    type: 'confirmed',
    title: '예약 승인',
    activityName: '북촌 한옥마을 투어',
    dateTime: '2023-01-18 10:00~12:00',
    createdAt: new Date(Date.now() - 1209600000), // 2주 전
    raw: '북촌 한옥마을 투어(2023-01-18 10:00~12:00) 예약이 승인되었습니다.',
  },
];

export const Default: Story = {
  args: {
    open: true,
    onClose: () => console.log('close'),
    items: mockNotifications,
    _onDelete: (id) => console.log('delete:', id),
  },
};

export const Empty: Story = {
  args: {
    open: true,
    onClose: () => console.log('close'),
    items: [],
  },
};

export const Few: Story = {
  args: {
    open: true,
    onClose: () => console.log('close'),
    items: mockNotifications.slice(0, 2),
  },
};
