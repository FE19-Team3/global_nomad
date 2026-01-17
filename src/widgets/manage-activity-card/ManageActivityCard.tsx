'use client';

import Image from 'next/image';
import { useState } from 'react';

import StarIcon from '@/shared/assets/icons/ic_star_on.png';
import Button from '@/shared/ui/Button/Button';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';

import { styles } from './ManageActivityCard.styles';
import type { ManageActivityCardProps } from './ManageActivityCard.types';

export const ManageActivityCard = ({ activity, onEdit, onDelete }: ManageActivityCardProps) => {
  const slots = styles();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <article className={slots.root()}>
      <div className={slots.content()}>
        <Text.B18 className={slots.title()}>{activity.title}</Text.B18>

        <div className={slots.rating()}>
          <div className="relative h-5 w-5">
            {!isImageLoaded && (
              <Skeleton.Rect width="100%" height="100%" className="rounded-xl md:rounded-4xl" />
            )}
            <Image src={StarIcon} alt="별점" fill className="object-contain" />
          </div>
          <Text.M16>
            {activity.rating.toFixed(1)} ({activity.reviewCount})
          </Text.M16>
        </div>

        <Text.B18 className={slots.price()}>
          ₩{activity.price.toLocaleString()} <span className="text-gray-400">/ 인</span>
        </Text.B18>

        <div className={slots.actions()}>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            radius="sm"
            className={slots.actionBtn()}
            onClick={() => onEdit?.(activity.id)}
          >
            <Text.M14>수정하기</Text.M14>
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            radius="sm"
            className={slots.actionBtn({ actionBtnVariant: 'secondary' })}
            onClick={() => onDelete?.(activity.id)}
          >
            <Text.B14>삭제하기</Text.B14>
          </Button>
        </div>
      </div>

      <div className={slots.thumbWrapper()}>
        {!isImageLoaded && (
          <Skeleton.Rect width="100%" height="100%" className="rounded-xl md:rounded-4xl" />
        )}
        <Image
          src={activity.bannerImageUrl}
          alt={activity.title}
          fill
          className={`${slots.thumb()} ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadingComplete={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
      </div>
    </article>
  );
};
