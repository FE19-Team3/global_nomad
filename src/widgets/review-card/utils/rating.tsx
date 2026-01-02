import RatingStar from '@/shared/assets/icons/RatingStar.svg';

export const renderStars = (rating: number, max = 5) => {
  return Array.from({ length: max }, (_, i) => {
    const filled = i < rating;
    return (
      <RatingStar
        key={i}
        className={['h-4 w-4', filled ? 'text-[#FFC23D]' : 'text-gray-300'].join(' ')}
        aria-hidden="true"
      />
    );
  });
};
