import { Header } from '@/widgets/header/ui/Header';

interface MyActivitesLayoutProps {
  children: React.ReactNode;
}

const MyActivitesLayout = ({ children }: MyActivitesLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-full max-w-175 py-10">{children}</div>
    </div>
  );
};

export default MyActivitesLayout;
