import type { Activity } from '@/entities/activity/model/activity.types';

export type ActivityDetailSchedule = {
  date: string;
  times: {
    id: number;
    startTime: string;
    endTime: string;
  }[];
};

export type ActivityDetail = Activity & {
  userId: number;
  description: string;
  subImages: {
    id: number;
    imageUrl: string;
  }[];
  schedules: ActivityDetailSchedule[];
  createdAt: string;
  updatedAt: string;
};
