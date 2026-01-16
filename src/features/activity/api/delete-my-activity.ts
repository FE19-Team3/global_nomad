import { clientApi } from '@/shared/api/client';

export const deleteMyActivity = async (activityId: number) => {
  await clientApi.del({
    path: `/my-activities/${activityId}`,
  });
};
