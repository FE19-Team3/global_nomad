import type { ProfileEditFormValues, ProfileEditSubmitValues } from '../model/validators';

export const mapFormToSubmitValues = (
  formValues: ProfileEditFormValues,
): ProfileEditSubmitValues => {
  const { nickname, password } = formValues;
  return { nickname, password };
};
