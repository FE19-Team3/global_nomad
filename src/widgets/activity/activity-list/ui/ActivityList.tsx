'use client';

import { useMemo } from 'react';

import { ActivityCard } from '@/widgets/activity/activity-card';
import type { Activity } from '@/widgets/activity/types';

interface ActivityListProps {
  experiences: Activity[];
  limit?: number;
}

export const ActivityList = ({ experiences, limit }: ActivityListProps) => {
  const items = useMemo(
    () => (limit && limit > 0 ? experiences.slice(0, limit) : experiences),
    [experiences, limit],
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
