import { clientApi } from '@/shared/api/client';
import { createActivityApiResponseSchema } from '@/shared/schema/activity';

export type CreateActivityPayload = {
  title: string;
  category: string;
  description: string;
  address: string;
  price: string;
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  bannerImageUrl?: string;
  subImageUrls?: string[];
};

export const createActivity = async (payload: CreateActivityPayload) => {
  return clientApi.post({
    path: '/activities',
    body: payload,
    schema: createActivityApiResponseSchema,
  });
};
