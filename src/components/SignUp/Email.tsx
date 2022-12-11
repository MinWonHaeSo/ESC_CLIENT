import React, { useEffect, useState } from 'react';
import formRegex from '@/constants/formRegex';
import palette from '@/lib/styles/palette';
import sw from '@/lib/utils/customSweetAlert';
import styled from '@emotion/styled';
import Input from '../common/atoms/Input';
import Button from '../common/atoms/Button';
import Label from '../common/atoms/Label';
import RequiredMessage from './RequiredMessage';
import { AllCheckedState } from './SignUpForm';
import { useEmailDoubleCheckMutation, useSendEmailValidateCodeMutation } from '@/api/userApi';
import { useAppDispatch } from '@/store/store';
import EmailValidation from './EmailValidation';
import { setEmail } from '@/store/userSlice';
import { checkEmailValidation } from './formValidation';

interface EmailFormProps {
  allChecked: AllCheckedState;
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>;
}

export interface ValidateState {
  emailOverlapCheck: boolean;
  validationActive: boolean;
  validationComplete: boolean;
}

const initialValidateProcessState: ValidateState = {
  emailOverlapCheck: false,
  validationActive: false,
  validationComplete: false,
};

const Email = ({ allChecked, setAllChecked }: EmailFormProps) => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [required, setRequired] = useState<boolean>(false);
  const [validateProcess, setValidateProcess] = useState(initialValidateProcessState);
  const { emailOverlapCheck, validationActive, validationComplete } = validateProcess;

  const dispatch = useAppDispatch();

  const [emailDoubleCheck] = useEmailDoubleCheckMutation();
  const [sendEmailValidateCode] = useSendEmailValidateCodeMutation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setInputEmail(currentEmail);
    checkEmailValidation(currentEmail, setRequired, setAllChecked, allChecked);
    setAllChecked({ ...allChecked, email: true });
  };

  const handleEmailDoubleCheck = async () => {
    if (inputEmail.length === 0) {
      return sw.toast.warn('이메일을 입력하세요.');
    }
    try {
      const response = await emailDoubleCheck({ email: inputEmail });
      if (response) {
        sw.toast.success(`중복검사가 완료되었습니다.`);
        setTimeout(() => {
          setValidateProcess({ ...validateProcess, emailOverlapCheck: true });
        }, 1000);
      }
    } catch {
      sw.toast.error('중복된 이메일 입니다.');
      throw new Error('중복된 이메일 입니다.');
    }
  };

  const handleEmailValidationButtonClick = async () => {
    // 이메일 인증코드 발송
    if (!emailOverlapCheck) {
      return sw.toast.warn('이메일 중복 검사를 먼저 해주세요.');
    }
    try {
      const response = await sendEmailValidateCode({ email: inputEmail });
      if (response) {
        sw.toast.success('인증코드가 발송되었습니다.<br>이메일을 확인하세요.');
        setTimeout(() => {
          setValidateProcess({ ...validateProcess, validationActive: true });
        }, 1000);
      }
    } catch {
      // setValidateProcess({...validateProcess, validationActive: true});
      throw new Error('이메일 발송 오류가 발생했습니다.');
    }
  };
  useEffect(() => {
    if (validationComplete) {
      dispatch(setEmail(inputEmail));
    }
  }, [validationComplete]);

  return (
    <>
      <EmailCheckFormBlock>
        <EmailCheck>
          <Label htmlFor={'email'} required={required}>
            이메일
          </Label>
          <DoubleCheckButton
            type="button"
            size={'small'}
            color={`${palette.grey[500]}`}
            backgroundColor={`${palette.grey[200]}`}
            onClick={handleEmailDoubleCheck}
          >
            중복검사
          </DoubleCheckButton>
        </EmailCheck>
        <Input
          value={inputEmail}
          type="email"
          id="email"
          placeholder="example@email.com"
          onChange={handleEmailChange}
          required={required}
        />
        <RequiredMessage required={required} />
        <SWrapper>
          <Button
            type={'button'}
            size={'large'}
            backgroundColor={emailOverlapCheck ? `${palette.black[100]}` : `${palette.grey[200]}`}
            onClick={handleEmailValidationButtonClick}
          >
            이메일 인증하기
          </Button>
        </SWrapper>
      </EmailCheckFormBlock>

      {validationActive ? (
        <EmailValidation
          required={required}
          validateProcess={validateProcess}
          setValidateProcess={setValidateProcess}
        />
      ) : null}
    </>
  );
};

export default Email;

const EmailCheckFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
`;

const EmailCheck = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DoubleCheckButton = styled(Button)`
  border: 1px solid black;
`;

const SWrapper = styled.div`
  margin-top: 8px;
`;
