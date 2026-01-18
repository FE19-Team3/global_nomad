import { clientApi } from '@/shared/api/client';
import { reservationDashboardSchema } from '@/shared/schema/reservation/reservation-dashboard.schema';

type Params = {
  activityId: number;
  year: string;
  month: string;
};

export const getReservationDashboard = async ({ activityId, year, month }: Params) => {
  const response = await clientApi.get({
    path: `/my-activities/${activityId}/reservation-dashboard`,
    query: { year, month },
    schema: reservationDashboardSchema,
  });

  return response.data;
};
