import type { CreateActivityApiResponse } from '@/shared/schema/activity';

import type { Activity } from './activity.types';

export const mapActivityFromApi = (api: CreateActivityApiResponse): Activity => ({
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
