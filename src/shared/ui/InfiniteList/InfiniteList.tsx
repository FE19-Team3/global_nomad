'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ReactNode, useRef, useEffect } from 'react';
import { cn } from 'tailwind-variants';

type InfiniteListProps<T, Cursor> = {
  estimateSize?: number; // row 높이
  orientation?: 'vertical' | 'horizontal';
  queryKey: readonly unknown[];
  fetchFn: (pageParam?: Cursor) => Promise<{ items: T[]; nextCursor?: Cursor }>;
  renderItem: (item: T) => ReactNode; // 각 아이템 렌더링
};

const InfiniteList = <T, Cursor>({
  estimateSize = 80,
  orientation = 'vertical',
  queryKey,
  fetchFn,
  renderItem,
}: InfiniteListProps<T, Cursor>) => {
  const parentRef = useRef<HTMLDivElement>(null); // Virtualizer가 스크롤 위치 추적을 위해 컨테이너 DOM 참조

  // React Query 무한 쿼리
  const {
    data,
    fetchNextPage, // 다음 페이지 로드 함수
    hasNextPage, // 더 불러올 페이지 있는지
    isFetchingNextPage, // 로딩상태
  } = useInfiniteQuery({
    queryKey, // 캐싱용 쿼리 식별 키
    initialPageParam: undefined as Cursor | undefined, // 첫 페이지는 cursor 없이
    queryFn: ({ pageParam }) => fetchFn(pageParam as Cursor | undefined), // 실제 api 호출
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined, // 다음 페이지 커서 추출
  });

  const items = data?.pages.flatMap((page) => page.items) ?? [];
  const isHorizontal = orientation === 'horizontal';

  // Virtualizer 설정
  const rowVirtualizer = useVirtualizer({
    count: items.length, // 전체 아이템 개수
    getScrollElement: () => parentRef.current, // 스크롤 컨테이너
    estimateSize: () => estimateSize, // 각 row 높이 추정값
    horizontal: isHorizontal,
    overscan: 5, // 화면 밖 위아래로 5개씩 미리 렌더링
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastVirtualItem = virtualItems[virtualItems.length - 1];
  useEffect(() => {
    if (!lastVirtualItem) {
      return;
    }
    if (lastVirtualItem.index >= items.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, items.length, isFetchingNextPage, lastVirtualItem?.index]);

  return (
    <div
      ref={parentRef}
      className={cn(
        'border border-black relative',
        isHorizontal
          ? 'w-full overflow-x-auto overflow-y-hidden' // 부모에 맡기므로 부모는 width/height을 가져야함
          : 'h-full overflow-y-auto overflow-x-hidden',
      )}
    >
      <div
        className={cn('relative', isHorizontal ? 'h-full' : 'w-full')}
        style={{
          width: isHorizontal ? `${rowVirtualizer.getTotalSize()}px` : undefined,
          height: !isHorizontal ? `${rowVirtualizer.getTotalSize()}px` : undefined,
        }}
      >
        {' '}
        {/* 전체 콘텐츠 높이 컨테이너 */}
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
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
      {isFetchingNextPage && <div className="text-center p-4 text-gray-500">Loading...</div>}
    </div>
  );
};

export default InfiniteList;
