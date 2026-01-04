export type NotificationType = 'confirmed' | 'declined';

export interface NotificationEntity {
  id: number;
  type: NotificationType;
  title: string;
  activityName: string;
  dateTime: string;
  createdAt: Date;
  raw: string;
}
