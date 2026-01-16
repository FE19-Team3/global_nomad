import { getActivityDetail } from '@/entities/activity/api/getActivityDetail';
import { mapToActivityDetail } from '@/features/activity/activity-detail/lib/mapToActivityDetail';
import { isApiError } from '@/shared/api';
import Text from '@/shared/ui/Text';
import ReviewSummary from '@/widgets/detail/ReviewSummary';
import { ActivityGallery } from '@/widgets/gallery/ActivityGallery';
import { LocationMap } from '@/widgets/location-map/LocationMap';
import { ReservationSection } from '@/widgets/Reservation/ui/ReservationSection';
import { ReviewCard } from '@/widgets/review-card';

type Props = {
  params: {
    activityId: string;
  };
};
// import { Pagination } from '@/shared/ui/Pagination/ui/Pagination';
export default async function Page({ params }: Props) {
  const { activityId } = await params;
  const id = Number(activityId);
  try {
    const { data } = await getActivityDetail(id);
    const activity = mapToActivityDetail(data);
    return (
      <div className="flex flex-col gap-5 md:flex-row ">
        <div className="flex flex-col gap-5 md:flex-1 md:gap-6 lg:gap-10">
          <ActivityGallery subImageUrls={activity.subImages.map((i) => i.imageUrl)} />
          {/* PC - activity-overview 영역 */}

          <div className="pb-5 border-b border-gray-100 md:pb-6 lg:pb-10">
            <Text size={18} weight="B">
              체험 설명
            </Text>
            <Text size={16} className="block mt-2">
              {activity.description}
            </Text>
          </div>
          <div className="flex flex-col gap-2 pb-5 border-b border-gray-100 md:pb-6 lg:pb-10">
            <Text size={18} weight="B">
              오시는 길
            </Text>
            <Text size={14}>{activity.address}</Text>
            <LocationMap
              location={{
                address: activity.address,
                placeName: activity.title,
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
        <ReservationSection price={activity.price} schedules={activity.schedules} />
      </div>
    );
  } catch (e) {
    if (isApiError(e)) {
      return <div>{e.message}</div>;
    }

    return <div>알 수 없는 에러가 발생했습니다.</div>;
  }
}
