// app/header-test/page.tsx
import LogoFont from '@/shared/assets/images/logo/logo_font.svg';
import LogoImg from '@/shared/assets/images/logo/logo_img.svg';
import Button from '@/shared/ui/Button/Button';
import { HeaderAuth } from '@/widgets/header/ui/HeaderAuth';
import { HeaderGuest } from '@/widgets/header/ui/HeaderGuest';

export default function Page() {
  const mockUser = {
    id: 1,
    nickname: '정만철',
    profileImageUrl: '',
  };

  return (
    <>
      <h1 className="text-2xl font-bold">헤더 테스트</h1>

      {/* 비로그인 */}
      <div>
        <h2 className="text-lg font-semibold mb-2">비로그인</h2>
        <header className="sticky top-0 z-50 w-full h-18 bg-white">
          <div className="max-w-[1520px] mx-auto h-full flex items-center justify-between px-4">
            <Button as="link" href="/" variant="icon" iconOnly>
              <LogoImg />
              <div className="ml-3">
                <LogoFont />
              </div>
            </Button>
            <HeaderGuest />
          </div>
        </header>
      </div>

      {/* 로그인 */}
      <div>
        <h2 className="text-lg font-semibold mb-2">로그인</h2>
        <header className="sticky top-0 z-50 w-full h-18 bg-white">
          <div className="max-w-[1520px] mx-auto h-full flex items-center justify-between px-4">
            <Button as="link" href="/" variant="icon" iconOnly>
              <LogoImg />
              <div className="ml-3">
                <LogoFont />
              </div>
            </Button>
            <HeaderAuth user={mockUser} />
          </div>
        </header>
      </div>
    </>
  );
}
