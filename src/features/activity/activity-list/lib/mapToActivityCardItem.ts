import type { ActivityCard } from '../model/activity-card.types';

export const mapToActivityCardItem = (activity: {
  id: number;
  title: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}): ActivityCard => ({
  id: activity.id,
  title: activity.title,
  rating: activity.rating,
  reviewCount: activity.reviewCount,
  price: activity.price,
  imageUrl: activity.bannerImageUrl,
  category: activity.category,
  address: activity.address,
  bannerImageUrl: activity.bannerImageUrl,
});
