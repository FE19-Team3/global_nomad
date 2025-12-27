import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import { pretendard } from '@/shared/assets/fonts/pretendard';
import { ThemeProvider, type Theme } from '@/shared/providers/theme-provider';
import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '[3팀] Globalnomad',
  description: '3팀에서 작업한 Globalnomad 페이지입니다.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get('theme')?.value;
  const theme: Theme = cookieTheme === 'dark' ? 'dark' : 'light';

  return (
    <html lang="ko" data-theme={theme}>
      <body className={`${pretendard.variable} antialiased`}>
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
