import { useState, useRef, useEffect } from 'react';
import { cn } from 'tailwind-variants';

import useActivityInfiniteList from '@/features/activity/hooks/useActivityInfiniteList';
import IC_ArrowLeft from '@/shared/assets/icons/ic_allow_left.svg';
import IC_ArrowRight from '@/shared/assets/icons/ic_arrow_right.svg';
import Button from '@/shared/ui/Button/Button';
import InfiniteList, { InfiniteListHandle } from '@/shared/ui/InfiniteList/InfiniteList';
import Text from '@/shared/ui/Text';

import { ActivityCard } from './ActivityCard';

const PopularSection = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { activities, fetchNextPage, hasNextPage } = useActivityInfiniteList({
    sort: 'most_reviewed',
  });

  const listRef = useRef<HTMLDivElement>(null);
  const virtualizerRef = useRef<InfiniteListHandle>(null);

  // 버튼 숨김 여부
  const checkScrollability = () => {
    const scrollElement = virtualizerRef.current?.getScrollElement();
    if (!scrollElement) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    const scrollElement = virtualizerRef.current?.getScrollElement();
    if (!scrollElement) return;

    checkScrollability();
    scrollElement.addEventListener('scroll', checkScrollability);

    return () => scrollElement.removeEventListener('scroll', checkScrollability);
  }, [activities.length]);

  // 초기 로드 및 데이터 변경 시 체크
  useEffect(() => {
    const timer = setTimeout(checkScrollability, 300);
    return () => clearTimeout(timer);
  }, [activities.length]);

  // 버튼 클릭으로 스크롤 이동
  const handleClickScroll = (direction: 'left' | 'right') => {
    if (!listRef.current || !virtualizerRef.current) return;
    const distance = listRef.current.clientWidth - 30;
    virtualizerRef.current.scrollBy(direction === 'right' ? distance : -distance);
  };

  return (
    <div>
      <Text.B18 as="h2" className="md:text-[32px] md:font-bold hidden md:block">
        🔥 인기 체험
      </Text.B18>

      <div className="relative mt-5">
        {canScrollLeft && (
          <Button
            radius="full"
            variant="secondary"
            onClick={() => handleClickScroll('left')}
            className="w-13.5 h-13.5 absolute -left-6.5 top-1/2 -translate-y-1/2 z-10 max-[743px]:hidden"
          >
            <IC_ArrowLeft />
          </Button>
        )}
        <div ref={listRef} className={cn('flex h-100 scroll-snap-x-mandatory')}>
          <InfiniteList
            ref={virtualizerRef}
            orientation="horizontal"
            estimateSize={280}
            items={activities}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            renderItem={(activity) => (
              <div key={activity.id} className={`w-${280} mx-2`}>
                <ActivityCard {...activity} />
              </div>
            )}
          />
        </div>
        {canScrollRight && (
          <Button
            radius="full"
            variant="secondary"
            onClick={() => handleClickScroll('right')}
            className="w-13.5 h-13.5 absolute -right-6.5 top-1/2 -translate-y-1/2 z-10 max-[743px]:hidden"
          >
            <IC_ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PopularSection;
