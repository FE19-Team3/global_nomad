'use client';

import ProfileEditForm from '@/widgets/mypage/ProfileEditForm/ui/ProfileEditForm';

const Page = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProfileEditForm nickname="JohnDoe" email="john.doe@example.com" />
    </div>
  );
};

export default Page;
