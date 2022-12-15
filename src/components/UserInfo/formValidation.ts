import formRegex from '@/constants/formRegex';
import React from 'react';

interface Required {
  password: boolean;
  passwordConfirm: boolean;
}

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

const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  name: 'password' | 'passwordConfirm',
  setRequired: React.Dispatch<React.SetStateAction<Required>>,
  required: Required,
) => {
  if (e.key === 'Backspace') {
    setRequired({ ...required, [name]: true });
  }
};

export { checkPasswordValidation, checkPasswordConfirmValidation, handleKeyDown };
