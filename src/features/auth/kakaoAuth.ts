export type KakaoAuthFlow = 'login' | 'signup';

type KakaoAuthUrlOptions = {
  flow: KakaoAuthFlow;
};

export const getKakaoAuthUrl = ({ flow }: KakaoAuthUrlOptions) => {
  // flow는 state로 넘겨서 콜백에서 분기하려고
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
    state: flow,
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};
