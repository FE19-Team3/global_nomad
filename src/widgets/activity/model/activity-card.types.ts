import type { Activity } from '@/entities/activity';

export type ActivityCardItem = Activity & {
  imageUrl?: string;
};
