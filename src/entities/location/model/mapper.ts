import { LocationEntity } from '@/entities/location/model/types';

export const toLocationEntity = (serverData: any): LocationEntity => {
  return {
    lat: serverData.latitude,
    lng: serverData.longitude,
    address: serverData.address || '',
    placeName: serverData.title || '',
  };
};
