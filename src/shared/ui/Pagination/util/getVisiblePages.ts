export const getVisiblePages = (currentPage: number, totalPages: number) => {
  const MAX = 5;
  const HALF = Math.floor(MAX / 2);

  let start = currentPage - HALF;
  let end = currentPage + HALF;

  if (start < 1) {
    start = 1;
    end = MAX;
  }

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, totalPages - MAX + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
