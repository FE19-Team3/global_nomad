import { useMemo } from 'react';

import NoData from '@/shared/ui/NoData';
import type { ActivityCardItem } from '@/widgets/activity/model/activity-card.types';

import { ActivityCard } from './ActivityCard';

interface ActivityListProps {
  activities?: ActivityCardItem[];
  limit?: number;
}

export const ActivityList = ({ activities = [], limit }: ActivityListProps) => {
  const items = useMemo(
    () => (limit && limit > 0 ? activities.slice(0, limit) : activities),
    [activities, limit],
  );

  return (
    <div className="flex flex-col gap-10">
      {!items.length ? (
        <div className="flex justify-center items-center">
          <NoData text="현재 진행중인 체험이 없어요" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-8">
          {items.map((item) => (
            <ActivityCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};
