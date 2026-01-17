'use client';

import LogoFont from '@/shared/assets/logo/logo_font.svg';
import LogoImg from '@/shared/assets/logo/logo_img.svg';
import Button from '@/shared/ui/Button/Button';

import { useAuth } from '../model/useAuth';

import { HeaderAuth } from './HeaderAuth';
import { HeaderGuest } from './HeaderGuest';

export const Header = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-100 w-full h-18 bg-white">
      <div className="max-w-[1520px] mx-auto h-full flex items-center justify-between px-4">
        {/* 로고 */}
        <Button as="link" href="/" variant="icon" iconOnly>
          <LogoImg className="w-7" />
          <div className="ml-3">
            <LogoFont className="w-34" />
          </div>
        </Button>
        {/* 로그인 여부에 따라 분기 */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* 사용자 메뉴 */}
              <HeaderAuth user={user!} />
            </>
          ) : (
            // 게스트 메뉴
            <HeaderGuest />
          )}
        </div>
      </div>
    </header>
  );
};
