import Image from 'next/image';

import { ReviewCard } from '@/entities/review';
import type { Review } from '@/entities/review';
import IC_Star from '@/shared/assets/images/star_on.png';

const reviews: Review[] = [
  {
    id: 1,
    author: '김태현',
    date: '2023. 2. 4',
    rating: 5,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
  },
  {
    id: 2,
    author: '조민선',
    date: '2023. 2. 4',
    rating: 5,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었고, 강사님의 친절한 설명 덕분에 저는 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다.',
  },
  {
    id: 3,
    author: '강지현',
    date: '2023. 2. 4',
    rating: 5,
    content:
      '전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 이번 체험을 거쳐 저의 춤추기 실력은 더욱 향상되었습니다.',
  },
];

const ReviewSection = () => {
  return (
    <section className="w-full max-w-4xl px-6">
      <div className="mb-6">
        <p className="text-b-18">
          체험 후기 <span className="text-m-16 text-gray-600">1,300개</span>
        </p>
        <div className="flex flex-col items-center gap-3">
          <div className="text-center">
            <p className="text-b-32">4.2</p>
            <p className="text-b-16">매우 만족</p>
          </div>
          <div className="flex items-center">
            <Image src={IC_Star} width={20} height={20} alt="별점" className="mr-1" />
            <p className="text-m-14 text-gray-600">1300개 후기</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
