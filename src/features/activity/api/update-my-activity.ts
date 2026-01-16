import { clientApi } from '@/shared/api/client';
import { createActivityApiResponseSchema } from '@/shared/schema/activity';

export type UpdateMyActivityPayload = {
  activityId: number;
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];
  scheduleIdsToRemove?: number[];
  schedulesToAdd?: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
};

export const updateMyActivity = async ({ activityId, ...payload }: UpdateMyActivityPayload) => {
  const response = await clientApi.patch({
    path: `/my-activities/${activityId}`,
    body: payload,
    schema: createActivityApiResponseSchema,
  });

  return response.data;
};
