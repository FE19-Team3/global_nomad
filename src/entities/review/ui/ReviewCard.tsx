import type { Review } from '../model/types';

type ReviewCardProps = {
  review: Review;
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={filled ? 'text-yellow-400' : 'text-gray-200'}
  >
    <path
      fill="currentColor"
      d="M12 2.25l2.92 5.91 6.53.95-4.72 4.6 1.11 6.49L12 17.97 6.16 20.2l1.11-6.49-4.72-4.6 6.53-.95L12 2.25z"
    />
  </svg>
);

const ReviewCard = ({ review }: ReviewCardProps) => {
  const rating = Math.max(0, Math.min(5, Math.round(review.rating)));

  return (
    <article className="rounded-2xl bg-white p-5 shadow-md">
      <div className="mb-1 flex items-center gap-2">
        <p className="text-b-16">{review.author}</p>
        <span className="text-m-14 text-gray-400">{review.date}</span>
      </div>
      <div className="mb-3 flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} filled={index < rating} />
        ))}
      </div>
      <p className="text-body-16">{review.content}</p>
    </article>
  );
};

export default ReviewCard;
