import Text from '@/shared/ui/Text';
import { styles, ReviewCardVM, renderStars } from '@/widgets/review-card';

export const ReviewCard = ({ nickname, rating, content, createdAt }: ReviewCardVM) => {
  const slots = styles();

  return (
    <article className={slots.root()}>
      <div className={slots.header()}>
        <Text.B14 as="h3" className="md:text-[16px]">
          {nickname}
        </Text.B14>
        <Text.M12 className="md:text-[14px] text-gray-400" aria-label={`작성일: ${createdAt}`}>
          {createdAt}
        </Text.M12>
      </div>
      <div className={slots.rating()} role="img" aria-label={`별점 5점 만점에 ${rating}점`}>
        {renderStars(rating)}
      </div>
      <Text.Body14 as="p" className="md:text-[16px] md:leading-[1.8]">
        {content}
      </Text.Body14>
    </article>
  );
};
