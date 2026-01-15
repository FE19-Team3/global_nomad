import ArtIcon from '@/shared/assets/icons/ic_art.svg';
import FoodIcon from '@/shared/assets/icons/ic_food.svg';
import SportsIcon from '@/shared/assets/icons/ic_sports.svg';
import TourIcon from '@/shared/assets/icons/ic_tour.svg';
import WellbeingIcon from '@/shared/assets/icons/ic_wellbeing.svg';

export const ActivityCategoryValues = [
  { value: '문화 · 예술', label: '문화 · 예술', icon: <ArtIcon /> },
  { value: '식음료', label: '음식', icon: <FoodIcon /> },
  { value: '스포츠', label: '스포츠', icon: <SportsIcon /> },
  { value: '투어', label: '투어', icon: <TourIcon /> },
  { value: '관광', label: '관광', icon: <TourIcon /> },
  { value: '웰빙', label: '체험', icon: <WellbeingIcon /> },
] as const;

export type ActivityCategory = (typeof ActivityCategoryValues)[number];

export const ActivitySortValues = ['most_reviewed', 'price_asc', 'price_desc', 'latest'] as const;

export type ActivitySort = (typeof ActivitySortValues)[number];
