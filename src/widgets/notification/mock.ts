import { NotificationApiResponse } from '@/entities/notification/model/notification.type';

import { Notification } from './NotificationModal';

export const mockNotificationResponse: NotificationApiResponse = {
  cursorId: 0,
  totalCount: 2,
  notifications: [
    {
      id: 1,
      teamId: 'team-1',
      userId: 1,
      content: '예약이 승인되었어요.',
      createdAt: '2026-01-02T18:20:00.000Z',
      updatedAt: '2026-01-02T18:20:00.000Z',
      deletedAt: null,
    },
  ],
};

export const mockNotifications: Notification[] = mockNotificationResponse.notifications.map(
  (n) => ({
    id: String(n.id),
    content: n.content,
    createdAt: n.createdAt,
    read: false,
  }),
);
