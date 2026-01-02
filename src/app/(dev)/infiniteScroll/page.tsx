'use client';

import { useState } from 'react';

import { InfiniteScrollTrigger } from '@/shared/ui/InfinitesScrollTrigger/InfiniteScrollTrigger';

const InfiniteScrollExample = () => {
  const [count, setCount] = useState(10);
  const [hasNext, setHasNext] = useState(true);

  const loadMore = () => {
    setCount((prev) => {
      const next = prev + 10;
      if (next >= 50) setHasNext(false);
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-20 bg-gray-100">
          item {i + 1}
        </div>
      ))}

      <InfiniteScrollTrigger onIntersect={loadMore} disabled={!hasNext} />
    </div>
  );
};

export default InfiniteScrollExample;
