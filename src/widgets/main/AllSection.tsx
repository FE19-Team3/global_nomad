import { useEffect, useState } from 'react';

import { ActivityListResponse } from '@/features/activity/activity-list/schema/activity-list.schema';
import { useActivityOffsetList } from '@/features/activity/hooks/useActivityOffsetList';
import { ActivityCategory, ActivitySort } from '@/shared/constants/activity';
import { Pagination } from '@/shared/ui/Pagination/ui/Pagination';
import MainCardSkeleton from '@/shared/ui/Skeleton/MainCardSkeleton';

import { ListHeader } from '../list/main/listHeader';

import { ActivityList } from './ActivityList';

interface Props {
  initialData: ActivityListResponse;
}

const AllSection = ({ initialData }: Props) => {
  const [pageSize, setPageSize] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<ActivitySort['values']>('latest');

  const { activities, totalCount, isLoading } = useActivityOffsetList({
    page,
    size: pageSize,
    sort: selectedSort,
    category: selectedCategory,
    initialData,
    enabled: pageSize !== 0,
  });

  // pagination
  useEffect(() => {
    const getPageSize = () => {
      if (window.innerWidth >= 1024) return 15; // lg
      if (window.innerWidth >= 768) return 4; // md
      return 6; // sm
    };

    // 초기 계산
    setPageSize(getPageSize());

    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //카테고리 변경 시 페이지 번호 초기화
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedSort, pageSize]);

  return (
    <section className="flex flex-col items-center mt-5">
      {/* header */}
      <ListHeader
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
        setSelectedCategory={setSelectedCategory}
        setSelectedSort={setSelectedSort}
      />
      {/* body */}
      <div className="w-full lg:min-h-261 md:min-h-217 min-h-191 h-fit">
        {isLoading ? (
          <MainCardSkeleton />
        ) : (
          <ActivityList activities={activities} limit={pageSize} />
        )}
      </div>
      {/* pagination */}
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
    </section>
  );
};

export default AllSection;
