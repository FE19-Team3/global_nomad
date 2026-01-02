'use client';

import { useState, useEffect, useMemo } from 'react';

import { ExperienceCard, type Experience } from '@/entities/experience';
import IconPageLeft from '@/shared/assets/images/icons/icon-page-left.svg';
import IconPageRight from '@/shared/assets/images/icons/icon-page-right.svg';
import Button from '@/shared/ui/Button/Button';

// 디바운스로 성능저하 막기
const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

interface ExperienceListProps {
  experiences: Experience[];
}

export const ExperienceList = ({ experiences }: ExperienceListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const pageLimit = 5;

  // 반응형 아이템 개수 조절
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      setItemsPerPage(width < 640 ? 4 : 15);
    };

    const debouncedUpdate = debounce(updateItemsPerPage, 200);

    updateItemsPerPage(); // 초기 실행
    window.addEventListener('resize', debouncedUpdate);
    return () => window.removeEventListener('resize', debouncedUpdate);
  }, []);

  // 페이지네이션 계산 로직
  const totalPages = Math.ceil(experiences.length / itemsPerPage);

  // 현재 페이지가 속한 그룹 계산 (예: 1~5페이지는 group 1)
  const currentGroup = Math.ceil(currentPage / pageLimit);
  const startPage = (currentGroup - 1) * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return experiences.slice(start, start + itemsPerPage);
  }, [experiences, currentPage, itemsPerPage]);

  if (!experiences.length) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
        {currentItems.map((item) => (
          <ExperienceCard key={item.id} {...item} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 mt-4">
          <Button
            variant="icon"
            iconOnly
            className={`!bg-transparent !border-none ${currentPage === 1 ? 'opacity-30 !cursor-default !pointer-events-none' : ''}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <Button.Icon>
              <IconPageLeft width={24} height={24} className="text-gray-950" />
            </Button.Icon>
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`relative w-10 h-10 flex items-center justify-center text-[14px] font-medium transition-colors ${
                    currentPage === pageNum ? 'text-gray-950' : 'text-gray-300 hover:text-gray-600'
                  }`}
                >
                  {pageNum}
                  {currentPage === pageNum && (
                    <div className="absolute bottom-1 left-2 right-2 h-0.5 bg-gray-950" />
                  )}
                </button>
              ),
            )}
          </div>

          <Button
            variant="icon"
            iconOnly
            className={`!bg-transparent !border-none ${currentPage === totalPages ? 'opacity-30 !cursor-default !pointer-events-none' : ''}`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            <Button.Icon>
              <IconPageRight width={24} height={24} className="text-gray-950" />
            </Button.Icon>
          </Button>
        </div>
      )}
    </div>
  );
};
