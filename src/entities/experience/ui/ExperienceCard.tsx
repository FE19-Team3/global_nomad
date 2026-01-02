import Image from 'next/image';
import Link from 'next/link';

import StarIcon from '@/shared/assets/images/icons/icon-star-sm.png';

import type { Experience } from '../model/types';

export const ExperienceCard = ({ title, rating, reviewCount, price, imageUrl }: Experience) => {
  return (
    <Link href="#" className="group block relative w-full h-92">
      <div className="relative w-full h-92 rounded-4xl text-gray-950">
        <div className="absolute inset-0 overflow-hidden rounded-4xl bg-gray-50">
          {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover" />}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
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
