import formRegex from '@/constants/formRegex';
import React from 'react';
import { AllCheckedState } from './SignUpForm';

interface Required {
  password: boolean;
  passwordConfirm: boolean;
}

const checkEmailValidation = (
  currentEmail: string,
  setRequired: React.Dispatch<React.SetStateAction<boolean>>,
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>,
  allChecked: AllCheckedState,
) => {
  const { emailRegex } = formRegex;
  if (!emailRegex.test(currentEmail)) {
    return setRequired(true);
  }
  setRequired(false);
  setAllChecked({ ...allChecked, email: true });
};

const checkPasswordValidation = (
  currentPassWord: string,
  setRequired: React.Dispatch<React.SetStateAction<Required>>,
  required: Required,
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>,
  allChecked: AllCheckedState,
) => {
  const { passwordRegex } = formRegex;
  if (!passwordRegex.test(currentPassWord)) {
    return setRequired({ ...required, password: true });
  }
  setRequired({ ...required, password: false });
  setAllChecked({ ...allChecked, password: true });
};

const checkPasswordConfirmValidation = (
  formState: { password: string; passwordConfirm: string },
  currentPassWordConfirm: string,
  setRequired: React.Dispatch<React.SetStateAction<Required>>,
  required: Required,
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>,
  allChecked: AllCheckedState,
) => {
  const { password } = formState;
  if (password !== currentPassWordConfirm) {
    return setRequired({ ...required, passwordConfirm: true });
  }
  setRequired({ ...required, passwordConfirm: false });
  setAllChecked({ ...allChecked, passwordConfirm: true });
};

const checkNickNameValidation = (
  currentNickName: string,
  setRequired: React.Dispatch<React.SetStateAction<boolean>>,
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>,
  allChecked: AllCheckedState,
) => {
  const nickNameLengthCheck = currentNickName.length < 2 || currentNickName.length > 15;
  if (nickNameLengthCheck) {
    return setRequired(true);
  }
  setRequired(false);
  setAllChecked({ ...allChecked, nickName: true });
};

export { checkEmailValidation, checkPasswordValidation, checkPasswordConfirmValidation, checkNickNameValidation };
