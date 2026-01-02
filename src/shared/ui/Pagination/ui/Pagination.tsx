// import ChevronDownIcon from '@/shared/assets/icons/ChevronDownIcon.svg';

import { PaginationProps } from '../model/types';

export const Pagination = ({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const clamp = (page: number) => Math.min(Math.max(page, 1), totalPages);
  const goTo = (page: number) => onPageChange(clamp(page));

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav aria-label="Pagination">
      <button disabled={isFirstPage} onClick={() => goTo(currentPage - 1)}>
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => {
        const p = i + 1;
        const active = p === currentPage;
        return (
          <button key={p} aria-current={active ? 'page' : undefined} onClick={() => goTo(p)}>
            {p}
          </button>
        );
      })}
      <button disabled={isLastPage} onClick={() => goTo(currentPage + 1)}>
        Next
      </button>
    </nav>
  );
};
