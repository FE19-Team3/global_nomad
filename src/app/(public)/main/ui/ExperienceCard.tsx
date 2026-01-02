import Image from 'next/image';
import Link from 'next/link';

import StarIcon from '@/shared/assets/images/icons/icon-star-sm.png';

interface ExperienceCardProps {
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  imageUrl?: string;
}

export const ExperienceCard = ({
  id,
  title,
  rating,
  reviewCount,
  price,
  imageUrl,
}: ExperienceCardProps & { id: number }) => {
  return (
    <Link href={`/experience/${id}`} className="group block relative w-full h-92">
      <div className="relative w-full h-92 rounded-4xl text-gray-950">
        {/* 이미지 영역 */}
        <div className="absolute inset-0 bg-gray-50 rounded-4xl overflow-hidden">
          {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover" />}
        </div>

        {/* 정보 표시 */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-white rounded-4xl px-7 py-5 shadow-lg">
            <h3 className="text-b-18 mb-1 group-hover:text-primary truncate">{title}</h3>

            <div className="flex items-center gap-1 mb-4">
              <div className="relative w-4 h-4">
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
