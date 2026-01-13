import Link from 'next/link';
import { redirect } from 'next/navigation';

type KakaoOauthCallbackPageProps = {
  searchParams: Promise<{
    code?: string;
    state?: string;
    error?: string;
  }>;
};

const KakaoOauthCallbackPage = async ({ searchParams }: KakaoOauthCallbackPageProps) => {
  const { code, state, error } = await searchParams;

  if (error || !code) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="text-m-18 text-gray-800">카카오 인증 실패</h1>
        <p className="text-m-16 text-gray-500">
          인증 정보를 확인하지 못했습니다. 다시 시도해 주세요.
        </p>
        <Link className="text-m-16 text-primary underline" href="/login">
          로그인으로 돌아가기
        </Link>
      </main>
    );
  }

  const params = new URLSearchParams();
  params.set('code', code);
  if (state) params.set('state', state);
  redirect(`/api/auth/oauth/kakao?${params.toString()}`);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-m-18 text-gray-800">카카오 인증 처리 중</h1>
      <p className="text-m-16 text-gray-500">잠시만 기다려 주세요.</p>
      {state && (
        <p className="text-xs text-gray-300" aria-hidden="true">
          flow: {state}
        </p>
      )}
    </main>
  );
};

export default KakaoOauthCallbackPage;
