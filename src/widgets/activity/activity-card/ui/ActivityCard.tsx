import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import NoImageIcon from '@/shared/assets/icons/ic_no_image.svg';
import StarIcon from '@/shared/assets/icons/ic_star_on.png';
import type { ActivityCardItem } from '@/widgets/activity/model/activity-card.types';

export const ActivityCard = ({
  id,
  title,
  rating,
  reviewCount,
  price,
  imageUrl,
}: ActivityCardItem) => {
  const [hasImage, setHasImage] = useState(Boolean(imageUrl));
  const ratingText = typeof rating === 'number' ? rating.toFixed(1) : '-';
  const reviewText = typeof reviewCount === 'number' ? reviewCount : 0;

  useEffect(() => {
    setHasImage(Boolean(imageUrl));
  }, [imageUrl]);

  return (
    <Link href={`/experience/${id}`} className="group relative block h-92 w-full">
      <div className="relative h-92 w-full rounded-4xl text-gray-950">
        <div className="absolute inset-0 overflow-hidden rounded-4xl bg-gray-50">
          {hasImage ? (
            <Image
              src={imageUrl!}
              alt={title}
              fill
              className="object-cover"
              onError={() => setHasImage(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">
              <NoImageIcon className="h-10 w-10" aria-hidden />
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="rounded-4xl bg-white px-7 py-5 shadow-lg">
            <h3 className="mb-1 truncate text-b-18 group-hover:text-primary">{title}</h3>

            <div className="mb-4 flex items-center gap-1">
              <div className="relative h-4 w-4">
                <Image src={StarIcon} alt="별점" fill className="object-contain" />
              </div>
              <span className="text-m-14">{ratingText}</span>
              <span className="text-m-14 text-gray-400">({reviewText})</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-b-18 tracking-tighter">₩ {price.toLocaleString()}</span>
              <span className="text-m-18 text-gray-400">/ 인</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
