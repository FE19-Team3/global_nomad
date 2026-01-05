import { Header } from '@/widgets/header/ui/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="py-10">{children}</div>
    </div>
  );
}
