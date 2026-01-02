export type NotificationApiItem = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type NotificationApiResponse = {
  cursorId: number;
  notifications: NotificationApiItem[];
  totalCount: number;
};
