import { SignupForm } from '@/features/signup';

const SignupPage = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-white py-10">
      <section className="w-full max-w-[448px]">
        <SignupForm />
      </section>
    </main>
  );
};

export default SignupPage;
