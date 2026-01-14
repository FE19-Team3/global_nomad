import type { ActivityDetailResponse } from '@/shared/schema/activity/activit-detail-response.schema';

import type { ActivityDetail } from '../model/activity-detail.types';

function isLegacySchedule(s: ActivityDetailResponse['schedules'][number]): s is {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
} {
  return 'startTime' in s;
}

export function mapToActivityDetail(dto: ActivityDetailResponse): ActivityDetail {
  const schedules = dto.schedules.map((s) => {
    if (isLegacySchedule(s)) {
      return {
        date: s.date,
        times: [
          {
            id: s.id,
            startTime: s.startTime,
            endTime: s.endTime,
          },
        ],
      };
    }
    return s;
  });

  return {
    id: dto.id,
    title: dto.title,
    category: dto.category,
    price: dto.price,
    address: dto.address,
    bannerImageUrl: dto.bannerImageUrl,
    rating: dto.rating,
    reviewCount: dto.reviewCount,

    userId: dto.userId,
    description: dto.description,
    subImages: dto.subImages,
    schedules,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
