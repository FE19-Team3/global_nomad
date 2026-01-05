import { LocationEntity } from '@/entities/location/model/types';
import { LocationMap } from '@/widgets/location-map/LocationMap';

const mockLocationData: LocationEntity = {
  address: '서울특별시 중구 세종대로 110 서울특별시청',
  placeName: '서울특별시청',
};
const Page = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-16 text-gray-900">
      <div className="w-100">
        <LocationMap location={mockLocationData} size="sm" />
      </div>
    </main>
  );
};

export default Page;
