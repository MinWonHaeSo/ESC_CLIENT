import formRegex from '@/constants/formRegex';
import React from 'react';

interface Required {
  password: boolean;
  passwordConfirm: boolean;
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

interface HandleKeyDown {
  e: React.KeyboardEvent<HTMLInputElement>;
  setNicknameCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const handleKeyDown = ({ e, setNicknameCheck }: HandleKeyDown) => {
  if (e.key === 'Backspace') {
    setNicknameCheck(false);
  }
};

export { checkPasswordValidation, checkPasswordConfirmValidation, handleKeyDown };
