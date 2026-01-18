'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { ReactNode, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { cn } from 'tailwind-variants';

export type InfiniteListHandle = {
  scrollBy: (distance: number) => void;
  getScrollElement: () => HTMLDivElement | null;
};

type InfiniteListProps<T> = {
  estimateSize?: number;
  nextCursor: number | null;
  items: T[];
  orientation?: 'vertical' | 'horizontal';
  fetchNextPage?: (cursor: number) => void;
  renderItem: (item: T) => ReactNode;
};

function InfiniteListInner<T>(
  {
    estimateSize = 80,
    nextCursor,
    items,
    orientation = 'vertical',
    fetchNextPage,
    renderItem,
  }: InfiniteListProps<T>,
  ref: React.Ref<InfiniteListHandle>,
) {
  const parentRef = useRef<HTMLDivElement>(null);
  const isHorizontal = orientation === 'horizontal';

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    horizontal: isHorizontal,
    overscan: 5,
  });

  useImperativeHandle(ref, () => ({
    scrollBy: (distance: number) => {
      if (!parentRef.current) return;

      if (isHorizontal) {
        parentRef.current.scrollBy({
          left: distance,
          behavior: 'smooth', // 부드러운 스크롤
        });
      }
    },
    getScrollElement: () => parentRef.current, // 스크롤 요소 접근용
  }));

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastVirtualItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!lastVirtualItem) return;
    if (lastVirtualItem.index < items.length - 1) return;
    if (!nextCursor) return;
    if (!fetchNextPage) return;

    fetchNextPage(nextCursor);
  }, [nextCursor, fetchNextPage, items.length, lastVirtualItem]);

  return (
    <div
      ref={parentRef}
      className={cn(
        'relative',
        isHorizontal
          ? 'w-full overflow-x-auto overflow-y-hidden custom-scrollbar'
          : 'h-full overflow-y-auto overflow-x-hidden custom-scrollbar',
      )}
    >
      <div
        className={cn('relative', isHorizontal ? 'h-full' : 'w-full')}
        style={{
          width: isHorizontal ? `${rowVirtualizer.getTotalSize()}px` : undefined,
          height: !isHorizontal ? `${rowVirtualizer.getTotalSize()}px` : undefined,
        }}
      >
        {virtualItems.map((virtualRow) => {
          const item = items[virtualRow.index];
          if (!item) return null;

          return (
            <div
              key={virtualRow.key}
              className={cn('absolute top-0 left-0', isHorizontal ? 'h-full' : 'w-full')}
              style={{
                transform: isHorizontal
                  ? `translateX(${virtualRow.start}px)`
                  : `translateY(${virtualRow.start}px)`,
                width: isHorizontal ? estimateSize : undefined,
              }}
            >
              {renderItem(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const InfiniteList = forwardRef(InfiniteListInner) as <T>(
  props: InfiniteListProps<T> & { ref?: React.Ref<InfiniteListHandle> },
) => ReturnType<typeof InfiniteListInner>;

export default InfiniteList;
