import { useEffect, useState } from 'react';

import { useActivityOffsetList } from '@/features/activity/hooks/useActivityOffsetList';
import { Pagination } from '@/shared/ui/Pagination/ui/Pagination';
import MainCardSkeleton from '@/shared/ui/Skeleton/MainCardSkeleton';
import Text from '@/shared/ui/Text';

import { ActivityList } from './ActivityList';

interface Props {
  keyword: string;
}

const SearchSection = ({ keyword }: Props) => {
  const [pageSize, setPageSize] = useState(0);
  const [page, setPage] = useState(1);

  const { activities, totalCount, isLoading } = useActivityOffsetList({
    page,
    size: pageSize,
    keyword,
    enabled: !!pageSize, // pageSize가 확정되었을 때만 쿼리 실행
  });

  useEffect(() => {
    const getPageSize = () => {
      if (window.innerWidth >= 1024) return 15; //lg
      if (window.innerWidth >= 768) return 4; // md
      return 6; // sm
    };
    setPageSize(getPageSize());

    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-full mb-7.5 flex flex-col gap-1">
        <div>
          <Text.B24>{keyword}</Text.B24>
          <Text.M24>로 검색한 결과입니다.</Text.M24>
        </div>
        <Text.M18 className="text-gray-700">총 {totalCount}개의 결과</Text.M18>
      </div>

      <div className="w-full">
        {isLoading ? (
          <MainCardSkeleton />
        ) : (
          <ActivityList activities={activities} limit={pageSize} />
        )}
      </div>

      {totalCount > 0 && (
        <div className="mt-7.5">
          <Pagination
            currentPage={page}
            pageType="main"
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(nextPage) => {
              setPage(nextPage);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchSection;
