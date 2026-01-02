import RatingStar from '@/shared/assets/icons/RatingStar.svg';
import { cn } from '@/shared/lib/cn';

export const renderStars = (rating: number, max = 5) => {
  return Array.from({ length: max }, (_, i) => {
    const filled = i < rating;
    return (
      <RatingStar
        key={i}
        className={cn('h-4 w-4', filled ? 'text-yellow-400' : 'text-gray-300')}
        aria-hidden="true"
      />
    );
  });
};
