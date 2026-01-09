import { Header } from '@/widgets/header/ui/Header';

interface DetailLayoutProps {
  children: React.ReactNode;
}

export default function DetailLayout({ children }: DetailLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="py-10">{children}</div>
    </div>
  );
}
