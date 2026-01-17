'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/widgets/header/model/useAuth';

import { ProfileEditForm } from '../ProfileEditForm/form/ProfileEdit.form';

import { useEditProfile } from './hooks/useEditProfile';

export const MyProfileClient = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { mutateAsync } = useEditProfile();

  useEffect(() => {
    if (!isLoading && !user) router.replace('/login');
  }, [router, user, isLoading]);

  if (!user) return null;

  return (
    <ProfileEditForm
      nickname={user.nickname}
      email={user.email}
      currentImageUrl={user.profileImageUrl}
      onSubmit={mutateAsync}
    />
  );
};
