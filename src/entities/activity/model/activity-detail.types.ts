import type { ActivitySubImage } from './activity-image.types';
import type { ActivitySchedule } from './activity-schedule.types';
import type { Activity } from './activity.types';

export type ActivityDetail = Activity & {
  userId: number;
  description: string;
  subImages: ActivitySubImage[];
  schedules: ActivitySchedule[];
  createdAt: string;
  updatedAt: string;
};
