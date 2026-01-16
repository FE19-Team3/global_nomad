export const ActivityCategoryValues = [
  '문화 · 예술',
  '식음료',
  '스포츠',
  '투어',
  '관광',
  '웰빙',
] as const;

export type ActivityCategory = (typeof ActivityCategoryValues)[number];

export const ActivitySortValues = ['most_reviewed', 'price_asc', 'price_desc', 'latest'] as const;

export type ActivitySort = (typeof ActivitySortValues)[number];
