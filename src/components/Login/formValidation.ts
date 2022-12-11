import formRegex from '@/constants/formRegex';
import React from 'react';

interface Required {
  email: boolean;
  password: boolean;
}

const checkEmailValidation = (
  currentEmail: string,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  setRequired: React.Dispatch<React.SetStateAction<Required>>,
  required: Required,
) => {
  const { emailRegex } = formRegex;
  if (!emailRegex.test(currentEmail)) {
    setLoaded(false);
    return setRequired({ ...required, email: true });
  }
  setRequired({ ...required, email: false });
};

const checkPassWordValidation = (
  currentPassWord: string,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  setRequired: React.Dispatch<React.SetStateAction<Required>>,
  required: Required,
) => {
  const { passwordRegex } = formRegex;
  if (!passwordRegex.test(currentPassWord)) {
    setLoaded(false);
    return setRequired({ ...required, password: true });
  }
  setLoaded(true);
  setRequired({ ...required, password: false });
};

export { checkEmailValidation, checkPassWordValidation };
