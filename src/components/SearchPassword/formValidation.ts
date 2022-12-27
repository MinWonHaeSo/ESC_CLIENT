import formRegex from '@/constants/formRegex';

interface Required {
  password: boolean;
  passwordConfirm: boolean;
}

interface EmailValidation {
  currentEmail: string;
  setRequired: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisteredCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PasswordValidation {
  currentPassword: string;
  setRequired: React.Dispatch<React.SetStateAction<Required>>;
  required: Required;
}

interface PasswordConfirmValidation {
  password: string;
  currentPasswordConfirm: string;
  setRequired: React.Dispatch<React.SetStateAction<Required>>;
  required: Required;
}

const checkEmailValidation = ({ currentEmail, setRequired, setRegisteredCheck }: EmailValidation) => {
  const { emailRegex } = formRegex;
  if (!emailRegex.test(currentEmail)) {
    return setRequired(true);
  }
  setRequired(false);
  setRegisteredCheck(true);
};

const checkPasswordValidation = ({ currentPassword, setRequired, required }: PasswordValidation) => {
  const { passwordRegex } = formRegex;
  if (!passwordRegex.test(currentPassword)) {
    return setRequired({ ...required, password: true });
  }
  setRequired({ ...required, password: false });
};

const checkPasswordConfirmValidation = ({
  password,
  currentPasswordConfirm,
  setRequired,
  required,
}: PasswordConfirmValidation) => {
  if (password !== currentPasswordConfirm) {
    return setRequired({ ...required, passwordConfirm: true });
  }
  setRequired({ ...required, passwordConfirm: false });
};

export { checkEmailValidation, checkPasswordValidation, checkPasswordConfirmValidation };
