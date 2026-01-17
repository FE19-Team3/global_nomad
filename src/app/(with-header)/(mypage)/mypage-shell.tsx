'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useState, useCallback } from 'react';

import { SideNav } from '@/widgets/side-nav/ui/side-nav';

import { styles } from './shell.style';

type MypageShellProps = {
  children: ReactNode;
};

export const MypageShell = ({ children }: MypageShellProps) => {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const slots = styles();

  const closeNav = useCallback(() => setIsNavOpen(false), []);

  useEffect(() => {
    if (!isNavOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNav();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isNavOpen, closeNav]);

  useEffect(() => {
    if (!isNavOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isNavOpen]);

  useEffect(() => {
    if (!isNavOpen) return;
    closeNav();
  }, [pathname, closeNav]);

  return (
    <div className="lg:flex lg:items-start relative lg:justify-center lg:gap-12 px-6">
      <SideNav className="hidden lg:flex absolute lg:relative lg:mt-10 right-full lg:right-auto top-10 lg:top-auto w-60" />
      <div className="max-w-187 mx-auto pt-6 lg:hidden">
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setIsNavOpen((v) => !v)}
            aria-label="사이드 메뉴 열기"
            aria-haspopup="menu"
            aria-expanded={isNavOpen}
            className={slots.sideMenuBtn()}
          >
            <span>메뉴</span>
          </button>

          {isNavOpen ? (
            <>
              <div className={slots.closeMenuBtn()}>
                <SideNav />
              </div>
              <button
                type="button"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setIsNavOpen(false)}
                aria-label="닫기"
              />
            </>
          ) : null}
        </div>
      </div>
      <div className="py-10 max-w-187 w-full flex flex-col items-center mx-auto lg:mx-0">
        {children}
      </div>
    </div>
  );
};
