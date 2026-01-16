import { MypageShell } from './mypage-shell';

interface MypageLayoutProps {
  children: React.ReactNode;
}

const MypageLayout = ({ children }: MypageLayoutProps) => {
  return <MypageShell>{children}</MypageShell>;
};

export default MypageLayout;
