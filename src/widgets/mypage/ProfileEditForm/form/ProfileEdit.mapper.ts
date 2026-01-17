import type { ProfileEditFormValues, ProfileEditSubmitValues } from '../model/validators';

export const mapFormToSubmitValues = (
  formValues: ProfileEditFormValues,
): ProfileEditSubmitValues => {
  const { nickname, password, profileImageUrl } = formValues;
  return { nickname, newPassword: password, profileImageUrl };
};
