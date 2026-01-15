import Text from '@/shared/ui/Text';
import ReviewSummary from '@/widgets/detail/ReviewSummary';
import { ActivityGallery } from '@/widgets/gallery/ActivityGallery';
import { LocationMap } from '@/widgets/location-map/LocationMap';
import { ReservationSection } from '@/widgets/Reservation/ui/ReservationSection';
import { ReviewCard } from '@/widgets/review-card';

// import { Pagination } from '@/shared/ui/Pagination/ui/Pagination';
const Page = () => {
  return (
    <div className="flex flex-col gap-5 md:flex-row ">
      <div className="flex flex-col gap-5 md:flex-1 md:gap-6 lg:gap-10">
        <ActivityGallery
          mainImageUrl={'/sub1.png'}
          subImageUrls={['/sub2.png', '/sub3.png', '/sub4.png']}
        />
        {/* PC - activity-overview 영역 */}

        <div className="pb-5 border-b border-gray-100 md:pb-6 lg:pb-10">
          <Text size={18} weight="B">
            체험 설명
          </Text>
          <Text size={16} className="block mt-2">
            안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스
            스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수
            있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다.
            저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록
            준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한
            스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지
            가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가
            제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희
            체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다.
          </Text>
        </div>
        <div className="flex flex-col gap-2 pb-5 border-b border-gray-100 md:pb-6 lg:pb-10">
          <Text size={18} weight="B">
            오시는 길
          </Text>
          <Text size={14}>서울 중구 청계천로 100 10F</Text>
          <LocationMap
            location={{
              lat: 123,
              lng: 234,
              address: '서울 중구 청계천로 100',
              placeName: '서울 시청',
            }}
          />
        </div>

        <ReviewSummary averageRating={4.5} totalCount={1300} />
        <div className="flex flex-col gap-4 pb-5 items-center">
          <ReviewCard
            nickname="김태현"
            rating={5}
            content="저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!"
            createdAt="2023.2.4"
          />
          <ReviewCard
            nickname="김태현"
            rating={5}
            content="저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!"
            createdAt="2023.2.4"
          />
        </div>
        <div className="mx-auto">
          {/* <Pagination currentPage={1} pageType="review" totalCount={5} onPageChange={() => {}} /> */}
        </div>
      </div>
      <ReservationSection price={1000} />
    </div>
  );
};

export default page;
