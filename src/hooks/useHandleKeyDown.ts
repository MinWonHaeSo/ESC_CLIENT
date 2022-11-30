import { AllCheckedState } from '@/components/SignUp/SignUpForm';
import React, { SetStateAction } from 'react';

export interface UseHandleKeyDownProps {
  e: React.KeyboardEvent<HTMLInputElement>;
  setChecked: React.Dispatch<SetStateAction<AllCheckedState>>;
  state: AllCheckedState;
  stateProp: 'email' | 'password' | 'passWordConfirm' | 'nickName';
}

export const useHandleKeyDown = ({ e, setChecked, state, stateProp }: UseHandleKeyDownProps) => {
  if (e.key === 'Backspace') {
    return setChecked({ ...state, [stateProp]: false });
  }
};
