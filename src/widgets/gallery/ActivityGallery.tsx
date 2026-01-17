import Image from 'next/image';

import { cn } from '@/shared/lib/cn';

import { styles } from './ActivityGallery.styles';

interface ActivityGalleryProps {
  mainImageUrl: string;
  subImageUrls?: string[];
}

export const ActivityGallery = ({ mainImageUrl, subImageUrls = [] }: ActivityGalleryProps) => {
  const images = [mainImageUrl, ...subImageUrls].slice(0, 4);

  const displayImages = images.slice(0, 4);
  const slots = styles({ count: displayImages.length as 0 | 1 | 2 | 3 | 4 });

  return (
    <div className={cn(slots.root())}>
      {displayImages.map((url, idx) => (
        <div key={`${url}-${idx}`} className={idx === 0 ? slots.main() : slots.sub()}>
          <Image src={url} alt={`activity-sub-${idx}`} fill className={cn(slots.image())} />
        </div>
      ))}
    </div>
  );
};
