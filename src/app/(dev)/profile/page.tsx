'use client';

import { ProfileEditForm } from '@/widgets/mypage/ProfileEditForm/form/ProfileEdit.form';

const ProfilePage = () => {
  type values = {
    nickname: string;
    password: string;
  };
  return (
    <div className="flex justify-center pt-10 pb-20">
      <ProfileEditForm
        nickname="현재닉네임"
        email="example@exam.com"
        onCancel={() => {
          console.log('취소하기 클릭됨');
        }}
        onSubmit={(values: values) => {
          console.log('폼 제출됨', values);
        }}
      />
    </div>
  );
};

export default ProfilePage;
