import { getActivityDetail } from '@/entities/activity/api/getActivityDetail';
import { mapToActivityDetail } from '@/features/activity/activity-detail/lib/mapToActivityDetail';
import { isApiError } from '@/shared/api';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ActivityDetailPage({ params }: Props) {
  try {
    const { id } = await params;

    const activityId = Number(id);
    const { data } = await getActivityDetail(activityId);
    const activity = mapToActivityDetail(data);

    return (
      <main>
        <h1>{activity.title}</h1>
        <p>{activity.description}</p>
        <p>{activity.address}</p>
        <p>{activity.price.toLocaleString()}원</p>

        <img src={activity.bannerImageUrl} alt={activity.title} />

        <section>
          <h2>이미지</h2>
          {activity.subImages.map((img) => (
            <img key={img.id} src={img.imageUrl} alt="" />
          ))}
        </section>

        <section>
          <h2>일정</h2>
          {activity.schedules.map((schedule) => (
            <div key={schedule.date}>
              <strong>{schedule.date}</strong>
              {schedule.times.map((time) => (
                <div key={time.id}>
                  {time.startTime} ~ {time.endTime}
                </div>
              ))}
            </div>
          ))}
        </section>
      </main>
    );
  } catch (e) {
    if (isApiError(e)) {
      return <div>{e.message}</div>;
    }

    return <div>알 수 없는 에러가 발생했습니다.</div>;
  }
}
