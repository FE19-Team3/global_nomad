import {
  NotificationApiResponse,
  NotificationApiResponseSchema,
} from '@/entities/notification/model/schema';
import { clientApi } from '@/shared/api/client';

interface GetNotificationsParams {
  cursorId?: number;
  size?: number;
}

export async function getNotifications(
  params?: GetNotificationsParams,
): Promise<NotificationApiResponse> {
  const query: Record<string, number> = {};

  if (params?.cursorId !== undefined) query.cursorId = params.cursorId;
  if (params?.size !== undefined) query.size = params.size;

  const { data } = await clientApi.get({
    path: '/my-notifications',
    query,
    schema: NotificationApiResponseSchema,
  });

  return data;
}
