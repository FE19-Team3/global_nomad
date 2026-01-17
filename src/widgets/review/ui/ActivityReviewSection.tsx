'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getActivityReviews } from '@/features/review/api/getActivityReviews';
import NoData from '@/shared/ui/NoData';
import { Pagination } from '@/shared/ui/Pagination/ui/Pagination';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ReviewCard } from '@/widgets/review-card';

import ReviewSummary from './ReviewSummary';

type Props = {
  activityId: number;
};

const PAGE_SIZE = 3;

function ReviewSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <Skeleton.Circle size={40} />
            <Skeleton.Row width={80} height={16} />
          </div>
          <Skeleton.Row width={100} height={14} />
          <Skeleton.Row width="100%" height={60} />
        </div>
      ))}
    </div>
  );
}

export function ActivityReviewSection({ activityId }: Props) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['activityReviews', activityId, page],
    queryFn: () => getActivityReviews(activityId, page, PAGE_SIZE),
  });

  if (isLoading) {
    return <ReviewSkeleton />;
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-gray-500">리뷰를 불러오는 중 오류가 발생했습니다.</div>
    );
  }

  if (!data?.data) {
    return null;
  }

  const { averageRating, totalCount, reviews } = data.data;

  if (totalCount === 0) {
    return (
      <div className="mx-auto">
        <NoData text="아직 등록된 리뷰가 없습니다" />
      </div>
    );
  }

  return (
    <>
      <ReviewSummary averageRating={averageRating} totalCount={totalCount} />

      <div className="flex flex-col gap-4 pb-5 items-center">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            nickname={review.user.nickname}
            rating={review.rating}
            content={review.content}
            createdAt={review.createdAt}
          />
        ))}
      </div>

      {totalCount > PAGE_SIZE && (
        <div className="mx-auto">
          <Pagination
            currentPage={page}
            pageType="review"
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </>
  );
}
