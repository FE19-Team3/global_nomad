import { Header } from '@/widgets/header/ui/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-300 py-7 pb-31 px-6 md:px-10 lg:py-22">{children}</div>
    </div>
  );
}
