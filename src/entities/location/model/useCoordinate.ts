'use client';

import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { z } from 'zod';

const KakaoAddressResultSchema = z.object({
  x: z.string(),
  y: z.string(),
});

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
          // result[0] 검증
          const parsed = KakaoAddressResultSchema.safeParse(result[0]);

          if (!parsed.success) {
            setIsError(true);
            return;
          }

          setCoords({
            lat: parseFloat(parsed.data.y),
            lng: parseFloat(parsed.data.x),
          });
        } else {
          setIsError(true);
        }
      });
    }
  }, [loading, address]);

  return { loading, coords, isError };
};
