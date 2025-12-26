import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../../../../public/fonts/PretendardVariable.woff2',
      style: 'normal',
      weight: '100 900',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});
