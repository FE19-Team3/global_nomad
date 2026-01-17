import { getActivityDetail } from '@/entities/activity/api/getActivityDetail';
import { mapToActivityDetail } from '@/features/activity/activity-detail/lib/mapToActivityDetail';
import { isApiError } from '@/shared/api';
import Text from '@/shared/ui/Text';
import { ActivityOverview } from '@/widgets/activity/activity-detail-header';
import { ActivityGallery } from '@/widgets/gallery/ActivityGallery';
import { LocationMap } from '@/widgets/location-map/LocationMap';
import { ReservationContainer } from '@/widgets/Reservation/ui/ReservationContainer';
import { ActivityReviewSection } from '@/widgets/review/ui/ActivityReviewSection';

type Props = {
  params: {
    activityId: string;
  };
};

export default async function Page({ params }: Props) {
  const { activityId } = await params;
  const id = Number(activityId);
  try {
    const { data } = await getActivityDetail(id);
    const activity = mapToActivityDetail(data);
    return (
      <main className="flex flex-col gap-5 md:flex-row mx-auto w-full max-w-350 px-6 py-22 md:px-10">
        <div className="flex flex-col gap-5 md:flex-1 md:gap-6 lg:gap-10">
          <ActivityGallery
            mainImageUrl={activity.bannerImageUrl}
            subImageUrls={activity.subImages.map((i) => i.imageUrl)}
          />
          {/* PC - activity-overview 영역 */}

          {/* 모바일/태블릿에서만 오버뷰 표시 */}
          <div className="lg:hidden">
            <ActivityOverview experience={activity} />
          </div>

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
            <div className="relative z-0">
              <LocationMap
                location={{
                  address: activity.address,
                  placeName: activity.title,
                }}
              />
            </div>
          </div>

          <ActivityReviewSection activityId={id} />
        </div>

        {/* 오른쪽: 데스크톱 사이드바 */}
        <aside className="lg:w-[384px]">
          <div className="sticky top-18 flex flex-col gap-6">
            {/* 데스크톱에서만 오버뷰 표시 */}
            <div className="hidden lg:block">
              <ActivityOverview experience={activity} />
            </div>

            <ReservationContainer
              activityId={id}
              price={activity.price}
              schedules={activity.schedules}
              ownerId={activity.userId}
            />
          </div>
        </aside>
      </main>
    );
  } catch (e) {
    if (isApiError(e)) {
      return <div>{e.message}</div>;
    }

    return <div>알 수 없는 에러가 발생했습니다.</div>;
  }
}
