'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { isApiError } from '@/shared/api';
import { cn } from '@/shared/lib/cn';
import { useModalStore } from '@/shared/stores/useModalStore';
import Button from '@/shared/ui/Button/Button';
import StateBadge, { BadgeVariant } from '@/shared/ui/StateBadge';
import Text from '@/shared/ui/Text';

import { changeBookingStatus } from './api/BookingCardApi';
import { styles } from './BookingCard.styles';
import { BookingCardProps } from './BookingCard.types';
import { ReviewModal } from './components/ReviewModal';

const STATUS_TO_BADGE_VARIANT: Record<BookingCardProps['reservation']['status'], BadgeVariant> = {
  pending: 'approve',
  confirmed: 'done',
  declined: 'reject',
  canceled: 'cancel',
  completed: 'complete',
};

export const BookingCard = ({ reservation }: BookingCardProps) => {
  const slots = styles();
  const { openAlert } = useModalStore();
  const router = useRouter();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const ReviewModalProp = {
    reservation: {
      title: reservation.activity.title,
      startTime: reservation.startTime,
      entTime: reservation.endTime,
      headCount: reservation.headCount,
      date: reservation.date,
      reservationId: reservation.id,
    },
    onClose: () => setIsReviewModalOpen(false),
  };

  const handleChangeStatus = async () => {
    try {
      await changeBookingStatus(reservation.id);
      openAlert({ message: '예약이 변경되었습니다.' });
      router.refresh();
    } catch (e) {
      if (isApiError(e)) {
        console.error('API Error:', e.message);
        openAlert({ message: e.message });
      }
    }
  };

  useEffect(() => {
    if (!isReviewModalOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isReviewModalOpen]);

  return (
    <>
      <article className={cn(slots.root())}>
        {/* 1. 이미지 영역 */}
        <div className={slots.thumbWrapper()}>
          <Image
            src={reservation.activity.bannerImageUrl}
            alt={reservation.activity.title}
            fill
            className={cn(slots.thumb())}
          />
        </div>

        <div className={slots.content()}>
          {/* 상태 뱃지 */}
          <div className="w-fit">
            <StateBadge
              variant={STATUS_TO_BADGE_VARIANT[reservation.status]}
              className="!py-1 !px-2"
            />
          </div>

          <Text.B18 className={slots.title()}>{reservation.activity.title}</Text.B18>

          <Text.M16 className={slots.date()}>
            {reservation.date} ~ {reservation.startTime} - {reservation.endTime}
          </Text.M16>

          <Text.B18 className={slots.info()}>
            ₩{reservation.totalPrice.toLocaleString()}
            <span className={slots.number()}> / {reservation.headCount}명</span>
          </Text.B18>

          <div className={slots.actions()}>
            {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  radius="sm"
                  className={slots.actionBtn()}
                  onClick={handleChangeStatus}
                >
                  <Text.M14>예약 변경</Text.M14>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  radius="sm"
                  className={slots.actionBtn({ actionBtnVariant: 'cancel' })}
                  onClick={handleChangeStatus}
                >
                  <Text.B14>예약 취소</Text.B14>
                </Button>
              </>
            )}

            {(reservation.status === 'canceled' || reservation.status === 'declined') && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                radius="sm"
                className={slots.actionBtn()}
              >
                <Text.B14>다시 예약하기</Text.B14>
              </Button>
            )}

            {reservation.status === 'completed' && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                radius="sm"
                className={slots.actionBtn()}
                onClick={() => setIsReviewModalOpen(true)}
              >
                <Text.B14>후기 작성</Text.B14>
              </Button>
            )}
          </div>
        </div>
      </article>
      {isReviewModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={ReviewModalProp.onClose}
          role="presentation"
        >
          <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <ReviewModal
              reservation={ReviewModalProp.reservation}
              onClose={ReviewModalProp.onClose}
            />
          </div>
        </div>
      )}
    </>
  );
};
