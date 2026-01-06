import LogoFont from '@/shared/assets/logo/logo_font.svg';
import LogoImg from '@/shared/assets/logo/logo_img.svg';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <LogoImg className="w-36" />
      <LogoFont className="w-64 mt-6 hidden md:block" />
      {children}
    </div>
  );
}
