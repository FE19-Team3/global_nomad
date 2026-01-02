'use client';

import { useState, useEffect } from 'react';

import IconPageLeft from '@/shared/assets/images/icons/icon-page-left.svg';
import IconPageRight from '@/shared/assets/images/icons/icon-page-right.svg';
import Button from '@/shared/ui/Button/Button';

import { ExperienceCard } from './ExperienceCard';

interface Experience {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  imageUrl?: string;
}

interface ExperienceListProps {
  experiences: Experience[];
}

export const ExperienceList = ({ experiences }: ExperienceListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const pageLimit = 5;

  // 반응형에 따른 아이템 개수 조절
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        // sm 기준
        setItemsPerPage(4);
      } else {
        setItemsPerPage(15);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  if (!experiences || experiences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg">등록된 체험이 없습니다.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(experiences.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = experiences.slice(startIndex, startIndex + itemsPerPage);

  // 현재 페이지가 속한 페이지 그룹 계산 (1~5, 6~10)
  const currentGroup = Math.ceil(currentPage / pageLimit);
  const startPage = (currentGroup - 1) * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-6">
        {currentItems.map((item) => (
          <ExperienceCard key={item.id} {...item} />
        ))}
      </div>

      {/* 페이지네이션: 총 아이템이 한 페이지 분량보다 많을 때만 노출 */}
      {experiences.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-1 mt-4">
          {/* 이전 버튼 */}
          <Button
            variant="icon"
            iconOnly
            className={`!bg-transparent !border-none ${currentPage === 1 ? '!cursor-default !pointer-events-none opacity-30' : ''}`}
            disabled={currentPage === 1}
            onClick={handlePrev}
          >
            <Button.Icon className="flex items-center justify-center m-0">
              <IconPageLeft width={24} height={24} className="text-gray-950" />
            </Button.Icon>
          </Button>

          {/* 숫자 버튼 그룹 */}
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

          {/* 다음 버튼 */}
          <Button
            variant="icon"
            iconOnly
            className={`!bg-transparent !border-none ${currentPage === totalPages ? '!cursor-default !pointer-events-none opacity-30' : ''}`}
            disabled={currentPage === totalPages}
            onClick={handleNext}
          >
            <Button.Icon className="flex items-center justify-center m-0">
              <IconPageRight width={24} height={24} className="text-gray-950" />
            </Button.Icon>
          </Button>
        </div>
      )}
    </div>
  );
};
