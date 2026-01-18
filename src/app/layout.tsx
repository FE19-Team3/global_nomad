import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import { pretendard } from '@/shared/assets/fonts/pretendard';
import { ModalProvider } from '@/shared/providers/ModalProvider';
import ReactQueryProvider from '@/shared/providers/ReactQueryProvider';
import { ThemeProvider, type Theme } from '@/shared/providers/theme-provider';
import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '체험 한입',
  description: '새로운 경험을 한입에',
  openGraph: {
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get('theme')?.value;
  const theme: Theme = cookieTheme === 'dark' ? 'dark' : 'light';

  return (
    <html lang="ko" data-theme={theme}>
      <body className={`${pretendard.variable} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider initialTheme={theme}>
            <ModalProvider />
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
