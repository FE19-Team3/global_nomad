'use client';

import LogoFont from '@/shared/assets/logo/logo_font0.svg';
import LogoImg from '@/shared/assets/logo/logo_img.svg';
import Button from '@/shared/ui/Button/Button';
import ThemeToggleButton from '@/widgets/theme-toggle/ThemeToggleButton';

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
          <LogoImg className="w-18" />
          <LogoFont className="w-20 ml-1 dark:bg-white" />
        </Button>
        <div className="flex items-center gap-0">
          <ThemeToggleButton />
          {/* 로그인 여부에 따라 분기 */}
          {isAuthenticated ? <HeaderAuth user={user!} /> : <HeaderGuest />}
        </div>
      </div>
    </header>
  );
};
