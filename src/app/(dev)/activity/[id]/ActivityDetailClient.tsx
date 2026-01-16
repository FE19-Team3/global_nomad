'use client';

import { ActivityDetail } from '@/features/activity/activity-detail/model/activity-detail.types';
import { createReservationClient } from '@/features/reservation/useCreateReservation';
import { isApiError } from '@/shared/api';
import { useModalStore } from '@/shared/stores/useModalStore';

type Props = {
  activity: ActivityDetail;
  activityId: number;
};

export default function ActivityDetailClient({ activity, activityId }: Props) {
  const { openAlert } = useModalStore();
  const handleReserve = async (scheduleId: number) => {
    try {
      await createReservationClient({
        activityId,
        body: {
          scheduleId,
          headCount: 1,
        },
      });
    } catch (e) {
      if (isApiError(e) && e.status === 409) {
        openAlert(e.message);
      }
    }
  };

  return (
    <section>
      <h2>일정</h2>
      {activity.schedules.map((schedule) => (
        <div key={schedule.date}>
          <strong>{schedule.date}</strong>

          {schedule.times.map((time) => (
            <div key={time.id}>
              <span>scheduleId: {time.id}</span>
              <button onClick={() => handleReserve(time.id)}>
                {time.startTime} ~ {time.endTime}
              </button>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
