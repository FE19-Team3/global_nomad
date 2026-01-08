type PaginationContext = 'main' | 'review';

export const PAGE_SIZE_MAP: Record<PaginationContext, number> = {
  main: 20,
  review: 3,
} as const;

export interface PaginationProps {
  currentPage: number;
  pageType: PaginationContext;
  totalCount: number;
  onPageChange: (page: number, pageSize: number) => void;
}
