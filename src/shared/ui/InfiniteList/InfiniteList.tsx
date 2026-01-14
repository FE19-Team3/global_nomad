'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ReactNode, useRef } from 'react';

import { InfiniteScrollTrigger } from '../InfinitesScrollTrigger/InfiniteScrollTrigger';

type InfiniteListProps<T, Cursor> = {
  queryKey: readonly unknown[];
  fetchFn: (pageParam?: Cursor) => Promise<{ items: T[]; nextCursor?: Cursor }>;
  renderItem: (item: T) => ReactNode; // 각 아이템 렌더링
  estimateSize?: number; // row 높이
  rootMargin?: string; // 트리거 감지 범위
};

const InfiniteList = <T, Cursor>({
  queryKey,
  fetchFn,
  renderItem,
  estimateSize = 80,
  rootMargin = '200px',
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

  // Virtualizer 설정
  const rowVirtualizer = useVirtualizer({
    count: items.length, // 전체 아이템 개수
    getScrollElement: () => parentRef.current, // 스크롤 컨테이너
    estimateSize: () => estimateSize, // 각 row 높이 추정값
    overscan: 5, // 화면 밖 위아래로 5개씩 미리 렌더링
  });

  return (
    <div
      ref={parentRef}
      className="border border-black"
      style={{
        height: '100vh', // 스크롤 가능하도록 고정 높이 필요
        overflow: 'auto', // 스크롤 활성화
      }}
    >
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
        {' '}
        {/* 전체 콘텐츠 높이 컨테이너 */}
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          if (!item) return null;

          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {renderItem(item)}
            </div>
          );
        })}
        <InfiniteScrollTrigger
          onIntersect={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          rootMargin={rootMargin}
        />
      </div>
      {isFetchingNextPage && <div className="text-center p-4 text-gray-500">Loading...</div>}
    </div>
  );
};

export default InfiniteList;
