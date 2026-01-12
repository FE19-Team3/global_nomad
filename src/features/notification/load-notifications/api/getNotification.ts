import { NotificationApiResponse } from '@/entities/notification/model/schema';

interface GetNotificationsParams {
  cursorId?: number;
  size?: number;
}

// **추후 수정: 실제 API 호출로 교체**
export async function getNotifications(
  _params?: GetNotificationsParams,
): Promise<NotificationApiResponse> {
  return {
    cursorId: null,
    totalCount: 2,
    notifications: [
      {
        id: 1,
        teamId: '3',
        userId: 2923,
        content: '알림 테스트용 체험(2026-01-10 14:00~16:00) 예약이 승인되었습니다.',
        createdAt: '2026-01-05T03:04:20.206Z',
        updatedAt: '2026-01-05T03:04:20.205Z',
        deletedAt: null,
      },
      {
        id: 2,
        teamId: '3',
        userId: 2923,
        content: '테스트 체험(2026-01-11 10:00~12:00) 예약이 거절되었습니다.',
        createdAt: '2026-01-05T02:00:00.000Z',
        updatedAt: '2026-01-05T02:00:00.000Z',
        deletedAt: null,
      },
    ],
  };
}
