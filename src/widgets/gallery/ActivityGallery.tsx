import Image from 'next/image';

import { cn } from '@/shared/lib/cn';

import { styles } from './ActivityGallery.styles';

interface ActivityGalleryProps {
  subImageUrls: string[];
}

export const ActivityGallery = ({ subImageUrls }: ActivityGalleryProps) => {
  const displaySubImgs = subImageUrls.slice(0, 4);
  const slots = styles({ count: displaySubImgs.length as any });

  return (
    <div className={cn(slots.root())}>
      {displaySubImgs.map((url, idx) => (
        <div key={url} className={idx === 0 ? slots.main() : slots.sub()}>
          <Image src={url} alt={`activity-sub-${idx}`} fill className={cn(slots.image())} />
        </div>
      ))}
    </div>
  );
};
