import Image from 'next/image';

import IC_Star from '@/shared/assets/icons/ic_star_on.png';
import Text from '@/shared/ui/Text';

const MAX_VALUE = {
  average: 5,
  total: 999,
};
interface ReviewSummaryProps {
  averageRating: number;
  totalCount: number;
}

const ReviewSummary = ({ averageRating, totalCount }: ReviewSummaryProps) => {
  const safeAve = Math.max(0, Math.min(averageRating, MAX_VALUE.average));
  const safeCount = Math.max(0, totalCount);

  const showAve = safeAve.toFixed(1);
  const showCount = safeCount > MAX_VALUE.total ? `${MAX_VALUE.total}+` : safeCount;

  return (
    <div className="flex items-center w-fit">
      <Image src={IC_Star} width={20} height={20} alt="별점" className="mr-1" />
      <Text.M14 className="mr-0.5">{showAve}</Text.M14>
      <Text.M14 className="text-gray-400">({showCount})</Text.M14>
    </div>
  );
};

export default ReviewSummary;
