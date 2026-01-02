// BookingCard.tsx
import Image from 'next/image';

import { cn } from '@/shared/lib/cn';
import Button from '@/shared/ui/Button/Button';
import StateBadge, { BadgeVariant } from '@/shared/ui/StateBadge';
import Text from '@/shared/ui/Text';

import { styles } from './BookingCard.styles';
import { BookingCardProps } from './BookingCard.types';

const STATUS_TO_BADGE_VARIANT: Record<BookingCardProps['reservation']['status'], BadgeVariant> = {
  pending: 'approve',
  confirmed: 'done',
  declined: 'reject',
  canceled: 'cancel',
  completed: 'complete',
};

export const BookingCard = ({ reservation }: BookingCardProps) => {
  const slots = styles();

  return (
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
              >
                <Text.M14>예약 변경</Text.M14>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                radius="sm"
                className={slots.actionBtn({ actionBtnVariant: 'cancel' })}
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
            >
              <Text.B14>후기 작성</Text.B14>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
