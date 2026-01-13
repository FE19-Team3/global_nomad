import { NotificationEntity } from '@/entities/notification/model/notification.type';
import { NotificationApiItem } from '@/entities/notification/model/schema';

export const parseNotification = (apiData: NotificationApiItem): NotificationEntity => {
  const { content, id, createdAt } = apiData;

  const isConfirmed = content.includes('승인');

  // 정규식으로 파싱: "체험명(날짜 시간) 예약이 승인/거절되었습니다."
  const match = content.match(/^(.+?)\((.+?)\)\s*예약이\s*(승인|거절)되었습니다\.?$/);

  if (!match) {
    // 파싱 실패 시 기본값
    return {
      id,
      type: isConfirmed ? 'confirmed' : 'declined',
      title: isConfirmed ? '예약 승인' : '예약 거절',
      activityName: '',
      dateTime: '',
      createdAt: new Date(createdAt),
      raw: content,
    };
  }

  const [, activityName, dateTime, status] = match;

  return {
    id,
    type: status === '승인' ? 'confirmed' : 'declined',
    title: status === '승인' ? '예약 승인' : '예약 거절',
    activityName: activityName.trim(),
    dateTime: dateTime.trim(),
    createdAt: new Date(createdAt),
    raw: content,
  };
};
