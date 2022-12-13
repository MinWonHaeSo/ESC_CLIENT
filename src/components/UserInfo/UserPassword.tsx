import { useChangePasswordRequestMutation } from '@/api/authApi';
import palette from '@/lib/styles/palette';
import sw from '@/lib/utils/customSweetAlert';
import { changePassword } from '@/store/authSlice';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import React, { SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../common/atoms/Button';
import Label from '../common/atoms/Label';
import { checkPasswordConfirmValidation, checkPasswordValidation } from './formValidation';

interface UserPasswordProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<SetStateAction<boolean>>;
  setEditDisabled: React.Dispatch<SetStateAction<boolean>>;
}

interface InitialFormState {
  password: string;
  passwordConfirm: string;
}

interface Required {
  password: boolean;
  passwordConfirm: boolean;
}

const initialFormState: InitialFormState = {
  password: '',
  passwordConfirm: '',
};

const initialRequiredState: Required = {
  password: false,
  passwordConfirm: false,
};

const UserPassword = ({ showPassword, setShowPassword, setEditDisabled }: UserPasswordProps) => {
  const [formState, setFormState] = useState<InitialFormState>(initialFormState);
  const [required, setRequired] = useState<Required>(initialRequiredState);
  const { password, passwordConfirm } = formState;

  const dispatch = useAppDispatch();
  const authUser = useSelector((state: RootState) => state.auth);
  const { email, password: prePassword } = authUser;

  const [changePasswordRequestAPI] = useChangePasswordRequestMutation();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormState({ ...formState, [id]: value });
    if (id === 'newPassword') {
      checkPasswordValidation(value, setRequired, required);
    } else if (id === 'newPasswordConfirm') {
      checkPasswordConfirmValidation(password, value, setRequired, required);
    }
  };

  const handleCompleteClick = async () => {
    if (password.length === 0 || passwordConfirm.length === 0) {
      return sw.toast.warn('새로운 비밀번호를 입력해주세요.');
    }

    if (prePassword === password) {
      return sw.toast.error('이전 비밀번호와 같습니다.');
    }

    // 소셜 로그인 x | 일반 로그인 o -> 이전 비밀번호가 존재하므로 가능
    if (prePassword) {
      try {
        const response = await changePasswordRequestAPI({
          email,
          prePassword,
          newPassword: password,
          confirmPassword: passwordConfirm,
          hasToken: true,
        });
        if (response) {
          sw.toast.success('비밀번호가 성공적으로 변경되었습니다.');
          setShowPassword(false);
          setEditDisabled(true);
          dispatch(changePassword(password));
        }
      } catch {
        console.error('비밀번호 변경에 실패했습니다.');
      }
    } else {
      // 화면 리프레쉬 후 전역 상태에서 이전 비밀번호를 인지 못하는 상황
      try {
        const response = await changePasswordRequestAPI({
          email,
          prePassword: null,
          newPassword: password,
          confirmPassword: passwordConfirm,
          hasToken: false,
        });
        if (response) {
          sw.toast.success('비밀번호가 성공적으로 변경되었습니다.');
          setShowPassword(false);
          setEditDisabled(true);
          dispatch(changePassword(password));
        }
      } catch {
        console.error('이전 비밀번호가 없습니다.');
      }
    }
  };

  const handleCancelClick = () => {
    setShowPassword(false);
    setEditDisabled(true);
  };

  return (
    <UserPasswordBlock showPassword={showPassword}>
      <Password>
        <Label htmlFor="password" required={false}>
          새로운 비밀번호
        </Label>
        <SWrapper>
          <PasswordInput
            type="text"
            value={password}
            id="password"
            minLength={8}
            placeholder={'새로운 비밀번호'}
            onChange={handleFormChange}
            // onKeyDown={handlePasswordKeyDown}
            required={required.password}
          />
          {password.length ? <i className="fa-solid fa-face-smile"></i> : <i className="fa-regular fa-face-smile"></i>}
        </SWrapper>
      </Password>
      <PasswordConfirm>
        <Label htmlFor="passwordConfirm" required={false}>
          새로운 비밀번호 확인
        </Label>
        <SWrapper>
          <PasswordConfirmInput
            type="text"
            value={passwordConfirm}
            id="passwordConfirm"
            minLength={8}
            placeholder={'새로운 비밀번호 확인'}
            onChange={handleFormChange}
            // onKeyDown={handlePasswordConfirmKeyDown}
            required={required.passwordConfirm}
          />
          {passwordConfirm === password && passwordConfirm.length > 0 ? (
            <i className="fa-solid fa-face-smile"></i>
          ) : (
            <i className="fa-regular fa-face-smile"></i>
          )}
        </SWrapper>
      </PasswordConfirm>
      <ButtonWrapper>
        <Button type="button" size="medium" backgroundColor={palette.black[100]} onClick={handleCompleteClick}>
          변경 완료
        </Button>
        <Button type="button" size="medium" backgroundColor={palette.grey[200]} onClick={handleCancelClick}>
          변경 취소
        </Button>
      </ButtonWrapper>
    </UserPasswordBlock>
  );
};

export default UserPassword;

const UserPasswordBlock = styled.div<{ showPassword: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 1rem;
  padding: 16px;
  background-color: ${palette.grey[100]};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  ${({ showPassword }) => showPassword && `border: 0.3px solid ${palette.black[200]}`}
`;

const Password = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
`;

const PasswordConfirm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
`;

const SWrapper = styled.div`
  display: flex;
  align-items: center;

  i {
    font-size: 20px;
  }
`;

const PasswordInput = styled.input<{ required: boolean }>`
  margin-right: 15px;
  width: 240px;
  padding: 8px 10px;
  color: ${palette.black[100]};
  border: ${({ required }) => (required ? `1px solid ${palette.primary.red}` : `1px solid ${palette.grey[300]}`)};
  border-radius: 10px;
`;

const PasswordConfirmInput = styled.input<{ required: boolean }>`
  margin-right: 15px;
  width: 240px;
  padding: 8px 10px;
  color: ${palette.black[100]};
  border: ${({ required }) => (required ? `1px solid ${palette.primary.red}` : `1px solid ${palette.grey[300]}`)};
  border-radius: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
