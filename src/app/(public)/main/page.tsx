import { ActivityListResponseSchema } from '@/features/activity/activity-list/schema/activity-list.schema';
import { serverApi } from '@/shared/api/server';
import MainContent from '@/widgets/main/MainContent';

const MainPage = async () => {
  const initialData = await serverApi.get({
    path: '/activities',
    query: {
      method: 'offset',
      page: 1,
      size: 20,
    },
    schema: ActivityListResponseSchema,
  });

  return <MainContent initialData={initialData.data} />;
};

export default MainPage;
