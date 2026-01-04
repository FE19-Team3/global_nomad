'use client';
import { useState } from 'react';

import { UpdateProfileImage } from '@/features/profile/components/UpdateProfileImage/UpdateProfileImage';

const ProfilePage = () => {
  const [_, setProfileImageUrl] = useState<string | null>(null);

  return (
    <div className="w-full h-full">
      <h1>프로필 페이지 (개발용)</h1>
      <UpdateProfileImage currentImageUrl={null} onImageUpdate={setProfileImageUrl} />
    </div>
  );
};

export default ProfilePage;
