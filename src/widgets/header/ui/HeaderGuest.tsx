'use client';

import Button from '@/shared/ui/Button/Button';
import Text from '@/shared/ui/Text';

export const HeaderGuest = () => {
  return (
    <div className="flex items-center gap-5 px-4 py-2">
      <Button as="link" variant="text" href="/login">
        <Button.Label>
          <Text.M14>로그인</Text.M14>
        </Button.Label>
      </Button>
      <span className="h-4 w-px bg-gray-100" />
      <Button as="link" variant="text" href="/signup">
        <Button.Label>
          <Text.M14>회원가입</Text.M14>
        </Button.Label>
      </Button>
    </div>
  );
};
