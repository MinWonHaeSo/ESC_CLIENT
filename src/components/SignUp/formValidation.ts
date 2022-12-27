import React from 'react';
import formRegex from '@/constants/formRegex';
import { AllCheckedState } from './SignUpForm';

interface Required {
  password: boolean;
  passwordConfirm: boolean;
}

interface EmailValidation {
  currentEmail: string;
  setRequired: React.Dispatch<React.SetStateAction<boolean>>;
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>;
  allChecked: AllCheckedState;
}

interface PasswordValidation {
  currentPassWord: string;
  setRequired: React.Dispatch<React.SetStateAction<Required>>;
  required: Required;
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>;
  allChecked: AllCheckedState;
}

interface PasswordConfirmValidation {
  formState: { password: string; passwordConfirm: string };
  currentPassWordConfirm: string;
  setRequired: React.Dispatch<React.SetStateAction<Required>>;
  required: Required;
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>;
  allChecked: AllCheckedState;
}

interface NickNameValidation {
  currentNickName: string;
  setRequired: React.Dispatch<React.SetStateAction<boolean>>;
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>;
  allChecked: AllCheckedState;
}

const checkEmailValidation = ({ currentEmail, setRequired, setAllChecked, allChecked }: EmailValidation) => {
  const { emailRegex } = formRegex;
  if (!emailRegex.test(currentEmail)) {
    return setRequired(true);
  }
  setRequired(false);
  setAllChecked({ ...allChecked, email: true });
};

const checkPasswordValidation = ({
  currentPassWord,
  setRequired,
  required,
  setAllChecked,
  allChecked,
}: PasswordValidation) => {
  const { passwordRegex } = formRegex;
  if (!passwordRegex.test(currentPassWord)) {
    return setRequired({ ...required, password: true });
  }
  setRequired({ ...required, password: false });
  setAllChecked({ ...allChecked, password: true });
};

const checkPasswordConfirmValidation = ({
  formState,
  currentPassWordConfirm,
  setRequired,
  required,
  setAllChecked,
  allChecked,
}: PasswordConfirmValidation) => {
  const { password } = formState;
  if (password !== currentPassWordConfirm) {
    return setRequired({ ...required, passwordConfirm: true });
  }
  setRequired({ ...required, passwordConfirm: false });
  setAllChecked({ ...allChecked, passwordConfirm: true });
};

const checkNickNameValidation = ({ currentNickName, setRequired, setAllChecked, allChecked }: NickNameValidation) => {
  const nickNameLengthCheck = currentNickName.length < 2 || currentNickName.length > 15;
  if (nickNameLengthCheck) {
    return setRequired(true);
  }
  setRequired(false);
  setAllChecked({ ...allChecked, nickName: true });
};

export { checkEmailValidation, checkPasswordValidation, checkPasswordConfirmValidation, checkNickNameValidation };
