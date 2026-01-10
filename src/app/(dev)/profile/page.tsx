'use client';

import { useState } from 'react';

import { UpdateProfileImage } from '@/features/profile/components/UpdateProfileImage/UpdateProfileImage';

const Page = () => {
  const [image, setImage] = useState<string | null>(null);
  return (
    <>
      <UpdateProfileImage currentImageUrl={image} onImageUpdate={setImage} />
    </>
  );
};

export default Page;
