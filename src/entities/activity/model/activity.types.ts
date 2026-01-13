import type { ActivitySubImage } from './activity-image.types';
import type { ActivitySchedule } from './activity-schedule.types';

export type Activity = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: ActivitySubImage[];
  schedules: ActivitySchedule[];
  rating: number;
  reviewCount: number;
  imageUrl?: string;
};
