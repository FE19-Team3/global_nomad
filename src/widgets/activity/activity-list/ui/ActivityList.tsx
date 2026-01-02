'use client';

import { useEffect, useMemo, useState } from 'react';

import IconPageLeft from '@/shared/assets/images/icons/icon-page-left.svg';
import IconPageRight from '@/shared/assets/images/icons/icon-page-right.svg';
import Button from '@/shared/ui/Button/Button';
import { ActivityCard } from '@/widgets/activity/activity-card';
import type { Activity } from '@/widgets/activity/types';

// 디바운스로 성능저하 막기
const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

interface ActivityListProps {
  experiences: Activity[];
}

export const ActivityList = ({ experiences }: ActivityListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const pageLimit = 5;

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      setItemsPerPage(width < 640 ? 4 : 15);
    };

    const debouncedUpdate = debounce(updateItemsPerPage, 200);

    updateItemsPerPage();
    window.addEventListener('resize', debouncedUpdate);
    return () => window.removeEventListener('resize', debouncedUpdate);
  }, []);

  const totalPages = Math.ceil(experiences.length / itemsPerPage);
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
          <ActivityCard key={item.id} {...item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1">
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
                  className={`relative flex h-10 w-10 items-center justify-center text-[14px] font-medium transition-colors ${
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
