import { clientApi } from '@/shared/api/client';
import { reservedScheduleSchema } from '@/shared/schema/reservation/reserved-schedule.schema';

type Params = {
  activityId: number;
  date: string;
};

export const getReservedSchedule = async ({ activityId, date }: Params) => {
  const response = await clientApi.get({
    path: `/my-activities/${activityId}/reserved-schedule`,
    query: { date },
    schema: reservedScheduleSchema,
  });

  return response.data;
};
