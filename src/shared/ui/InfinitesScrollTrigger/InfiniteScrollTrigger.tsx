'use client';

import { useEffect, useRef } from 'react';

type Props = {
  onIntersect: () => void; // 화면에 보였을 때 실행할 콜백
  disabled?: boolean; // 더 이상 불러올 게 없을 때 감지 중단용
  rootMargin?: string; // 언제 미리 감지할지
};

export const InfiniteScrollTrigger = ({
  onIntersect,
  disabled = false,
  rootMargin = '200px',
}: Props) => {
  // 관찰 대상 DOM을 담을 ref
  // 실제 화면에 렌더링되는 div를 가리킴
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    //아직 DOM이 연결 안 됐으면 종료
    if (disabled || !ref.current) return;

    // IntersectionObserver 생성
    // entry = 관찰 대상이 화면에 들어왔는지 정보
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 화면에 들어오면
        if (entry.isIntersecting) {
          onIntersect(); // 외부에서 넘긴 콜백 실행
        }
      },
      // 실제 화면보다 rootMargin 만큼 위/아래에서 미리 감지
      { rootMargin },
    );

    // ref가 가리키는 div를 관찰 시작
    observer.observe(ref.current);

    // 컴포넌트 unmount / deps 변경 시 observer 해제
    return () => observer.disconnect();
  }, [
    onIntersect, // 콜백이 바뀌면 observer 재생성
    disabled, // 비활성화 상태 바뀌면 반영
    rootMargin, // 감지 기준 바뀌면 반영
  ]);

  //트리거
  return <div ref={ref} />;
};
