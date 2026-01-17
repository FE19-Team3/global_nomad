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
    <header className="sticky top-0 z-50 w-full h-18 bg-white shadow-md">
      <div className="max-w-380 mx-auto h-full flex items-center justify-between px-4">
        {/* 로고 */}
        <Button as="link" href="/" variant="icon" iconOnly className="group">
          <LogoImg className="w-7 transition-transform duration-150 group-hover:scale-118 group-hover:animate-pulse" />
          <LogoFont className="w-34 ml-3 dark:bg-white" />
        </Button>
        {/* 로그인 여부에 따라 분기 */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? <HeaderAuth user={user!} /> : <HeaderGuest />}
        </div>
      </div>
    </header>
  );
};
