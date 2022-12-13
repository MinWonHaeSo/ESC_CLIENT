import formRegex from '@/constants/formRegex';
interface Required {
  password: boolean;
  passwordConfirm: boolean;
}

const checkEmailValidation = (
  currentEmail: string,
  setRequired: React.Dispatch<React.SetStateAction<boolean>>,
  setRegisteredCheck: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { emailRegex } = formRegex;
  if (!emailRegex.test(currentEmail)) {
    return setRequired(true);
  }
  setRequired(false);
  setRegisteredCheck(true);
};

const checkPasswordValidation = (
  currentPassword: string,
  setRequired: React.Dispatch<React.SetStateAction<Required>>,
  required: Required,
) => {
  const { passwordRegex } = formRegex;
  if (!passwordRegex.test(currentPassword)) {
    return setRequired({ ...required, password: true });
  }
  setRequired({ ...required, password: false });
};

const checkPasswordConfirmValidation = (
  password: string,
  currentPasswordConfirm: string,
  setRequired: React.Dispatch<React.SetStateAction<Required>>,
  required: Required,
) => {
  if (password !== currentPasswordConfirm) {
    return setRequired({ ...required, passwordConfirm: true });
  }
  setRequired({ ...required, passwordConfirm: false });
};

export { checkEmailValidation, checkPasswordValidation, checkPasswordConfirmValidation };
