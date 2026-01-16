import { useEffect, useState } from 'react';

import { Pagination } from '@/shared/ui/Pagination/ui/Pagination';

import { ActivityCardItem } from '../activity/activity-card';

import { ActivityList } from './ActivityList';

interface Props {
  activities: ActivityCardItem[];
}

const AllSection = ({ activities }: Props) => {
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);

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

  const pageType = 'main';
  const totalCount = activities.length;
  const offset = (page - 1) * pageSize;

  const pagedActivities = activities.slice(offset, offset + pageSize);

  return (
    <div className="flex flex-col items-center mt-5">
      {/* header */}
      <div className="flex justify-between mb-7.5 w-full">
        <div className="flex gap-5">
          <span className="border rounded-full px-2 py-1">뱃지</span>
          <span className="border rounded-full px-2 py-1">뱃지</span>
          <span className="border rounded-full px-2 py-1">뱃지</span>
          <span className="border rounded-full px-2 py-1">뱃지</span>
          <span className="border rounded-full px-2 py-1">뱃지</span>
        </div>
        <div>가격 ▼</div>
      </div>
      {/* body */}
      <div className="w-full">
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
    </div>
  );
};

export default AllSection;
