import { useMemo } from 'react';

import type { Activity } from '@/entities/activity';

import { ActivityCard } from './ActivityCard';

interface ActivityListProps {
  activities?: Activity[];
  limit?: number;
}

export const ActivityList = ({ activities = [], limit }: ActivityListProps) => {
  const items = useMemo(
    () => (limit && limit > 0 ? activities.slice(0, limit) : activities),
    [activities, limit],
  );

  if (!items.length) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
        {items.map((item) => (
          <ActivityCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
