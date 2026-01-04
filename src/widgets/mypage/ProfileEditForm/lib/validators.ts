export const noSpaces = (v: string) => v.replace(/\s/g, '');

export const validateNickname = (v: string) => {
  if (v.length < 2 || v.length > 10) return '닉네임은 2~10자만 가능합니다.';
  return null;
};

export const validatePassword = (v: string) => {
  if (v.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다.';
  return null;
};
