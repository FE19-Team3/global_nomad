'use client';

import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

export const useCoordinate = (address: string) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!,
    libraries: ['services'],
  });

  useEffect(() => {
    if (!loading && window.kakao && window.kakao.maps.services) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setCoords({
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          });
        } else {
          setIsError(true);
        }
      });
    }
  }, [loading, address]);

  return { loading, coords, isError };
};
