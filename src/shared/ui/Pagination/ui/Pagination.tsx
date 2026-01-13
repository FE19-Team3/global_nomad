import ArrowRightIcon from '@/shared/assets/icons/ic_arrow_right.svg';
import { cn } from '@/shared/lib/cn';

import { PaginationProps, PAGE_SIZE_MAP } from '../model/types';
import { getVisiblePages } from '../util/getVisiblePages';

import { paginationStyles } from './Pagination.styles';

import ArrowLeftIcon from '@/shared/assets/icons/ic_allow_left_icon.svg';

export const Pagination = ({
  currentPage,
  pageType,
  totalCount,
  onPageChange,
}: PaginationProps) => {
  const pageSize = PAGE_SIZE_MAP[pageType];
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const clamp = (page: number) => Math.min(Math.max(page, 1), totalPages);
  const goTo = (page: number) => onPageChange(clamp(page), pageSize);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const slots = paginationStyles();

  return (
    <nav aria-label="페이지 이동" className={slots.container()}>
      <button
        type="button"
        className={cn(slots.button(), slots.arrowButton())}
        disabled={isFirstPage}
        onClick={() => goTo(currentPage - 1)}
        aria-label="이전 페이지"
      >
        <ArrowLeftIcon className={slots.arrowIcon()} />
      </button>
      {visiblePages.map((p) => {
        const active = p === currentPage;
        return (
          <button
            className={cn(slots.button(), active && slots.active())}
            key={p}
            aria-current={active ? 'page' : undefined}
            onClick={() => goTo(p)}
          >
            {p}
          </button>
        );
      })}
      <button
        type="button"
        className={cn(slots.button(), slots.arrowButton())}
        disabled={isLastPage}
        onClick={() => goTo(currentPage + 1)}
        aria-label="다음 페이지"
      >
        <ArrowRightIcon className={cn(slots.arrowIcon())} />
      </button>
    </nav>
  );
};
