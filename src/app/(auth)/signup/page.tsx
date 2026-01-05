import Image from 'next/image';

import { SignupForm } from '@/features/signup/ui/SignupForm';
import Logo from '@/shared/assets/images/logoWithText.png';

const SignupPage = () => {
  return (
    <main className="h-screen w-full flex flex-col items-center gap-15 justify-center bg-white py-10">
      <Image src={Logo} alt="logo" />
      <SignupForm />
    </main>
  );
};

export default SignupPage;
