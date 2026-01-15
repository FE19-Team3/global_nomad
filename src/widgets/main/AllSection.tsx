import { useEffect, useState } from 'react';

import { Pagination } from '@/shared/ui/Pagination/ui/Pagination';

import { ActivityCardItem } from '../activity/activity-card';
import { ListHeader } from '../list/main/listHeader';

import { ActivityList } from './ActivityList';

interface Props {
  activities: ActivityCardItem[];
}

const AllSection = ({ activities }: Props) => {
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  //카테리 변경 시 페이지 번호 초기화
  useEffect(() => {
    setPage(1);
  }, [selectedCategories]);

  // 선택된 카테고리로 activities 필터링
  const filteredActivities = selectedCategories.length
    ? activities.filter((a) => selectedCategories.includes(a.category))
    : activities;

  const pageType = 'main';
  const totalCount = filteredActivities.length;
  const offset = (page - 1) * pageSize;

  const pagedActivities = filteredActivities.slice(offset, offset + pageSize);

  return (
    <section className="flex flex-col items-center mt-5">
      {/* header */}
      <ListHeader selected={selectedCategories} setSelected={setSelectedCategories} />
      {/* body */}
      <div className="w-full lg:min-h-261 md:min-h-217 min-h-191 h-fit">
        <ActivityList activities={pagedActivities} />
      </div>
      {/* pagination */}
      <div className="mt-7.5">
        <Pagination
          currentPage={page}
          pageType={pageType}
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
