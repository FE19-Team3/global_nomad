import { Header } from '@/widgets/header/ui/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>{children}</main>
    </div>
  );
};
