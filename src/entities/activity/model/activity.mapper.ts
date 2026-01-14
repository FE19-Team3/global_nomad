import type { CreateActivityApiResponse } from '@/shared/schema/activity';

import type { ActivityDetail } from './activity-detail.types';

export const mapActivityFromApi = (api: CreateActivityApiResponse): ActivityDetail => ({
  ...api,
  schedules: api.schedules.flatMap((schedule) =>
    schedule.times.map((time) => ({
      id: time.id,
      date: schedule.date,
      startTime: time.startTime,
      endTime: time.endTime,
    })),
  ),
});
