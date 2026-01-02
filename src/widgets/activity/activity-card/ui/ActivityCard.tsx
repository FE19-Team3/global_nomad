import Image from 'next/image';
import Link from 'next/link';

import StarIcon from '@/shared/assets/images/icons/icon-star-sm.png';
import type { Activity } from '@/widgets/activity/types';

export const ActivityCard = ({ id, title, rating, reviewCount, price, imageUrl }: Activity) => {
  return (
    <Link href={`/experience/${id}`} className="group relative block h-92 w-full">
      <div className="relative h-92 w-full rounded-4xl text-gray-950">
        <div className="absolute inset-0 overflow-hidden rounded-4xl bg-gray-50">
          {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover" />}
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="rounded-4xl bg-white px-7 py-5 shadow-lg">
            <h3 className="mb-1 truncate text-b-18 group-hover:text-primary">{title}</h3>

            <div className="mb-4 flex items-center gap-1">
              <div className="relative h-4 w-4">
                <Image src={StarIcon} alt="별점" fill className="object-contain" />
              </div>
              <span className="text-m-14">{rating.toFixed(1)}</span>
              <span className="text-m-14 text-gray-400">({reviewCount})</span>
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
