'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { LocationEntity } from '@/entities/location/model/types';
import { useCoordinate } from '@/entities/location/model/useCoordinate';
import { cn } from '@/shared/lib/cn';

import { styles } from './LocationMap.styles';

interface LocationMapProps {
  location: LocationEntity;
  level?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LocationMap = ({ location, level = 3, className, size }: LocationMapProps) => {
  const { loading, coords, isError } = useCoordinate(location.address);
  const slots = styles({ size });

  if (isError) return <div className={cn(slots.error())}>지도를 표시할 수 없는 주소입니다.</div>;

  if (loading || !coords) {
    return <div className={cn(slots.loading())}>지도를 불러오는 중...</div>;
  }

  return (
    <div className={cn(slots.root(), className)}>
      <Map center={coords} className={cn(slots.map())} level={level}>
        <MapMarker position={coords}>
          <div className="p-2 text-sm text-black">{location.placeName || location.address}</div>
        </MapMarker>
      </Map>
    </div>
  );
};
