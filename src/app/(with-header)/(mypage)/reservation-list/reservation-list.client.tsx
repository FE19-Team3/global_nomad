'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';

import { Checkbox } from '@/shared/ui/CheckBox/Checkbox';
import Text from '@/shared/ui/Text';
import { ReservationList } from '@/widgets/mypage/reservation-list/reservationList';
import { type StatusLabel } from '@/widgets/mypage/reservation-list/utils/map';

import { reservationListInfiniteQuery } from './queries/reservationList';

const categories = [
  { label: '승인 대기' },
  { label: '예약 승인' },
  { label: '예약 취소' },
  { label: '예약 거절' },
  { label: '체험 완료' },
] as const;

export const ReservationListClient = () => {
  const query = useInfiniteQuery(reservationListInfiniteQuery({}));
  const [selected, setSelected] = useState<StatusLabel[]>([]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && query.hasNextPage && !query.isFetchingNextPage) {
        query.fetchNextPage();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage]);

  if (query.isLoading) return <div>Loading...</div>;
  if (!query.data) return null;

  const toggle = (label: StatusLabel, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, label] : prev.filter((v) => v !== label)));
  };

  const reservations = query.data.pages.flatMap((page) => page.reservations);

  return (
    <div className="flex flex-col gap-6 w-94 md:w-186">
      <div className="flex flex-col py-2 gap-1">
        <Text.B18 as="h2">내 정보</Text.B18>
        <Text.M14 as="span" className="text-gray-500">
          닉네임과 비밀번호를 수정하실 수 있습니다.
        </Text.M14>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map(({ label }) => (
          <Checkbox
            key={label}
            label={label}
            checked={selected.includes(label)}
            onChange={(checked) => toggle(label, checked)}
          />
        ))}
      </div>
      <ReservationList data={reservations} filter={selected} />
      <div ref={loadMoreRef} />
    </div>
  );
};
