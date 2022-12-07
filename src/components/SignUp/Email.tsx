import React, { useState } from 'react';
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

interface EmailFormProps {
  allChecked: AllCheckedState;
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>;
}

const Email = ({ allChecked, setAllChecked }: EmailFormProps) => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [required, setRequired] = useState<boolean>(false);
  const [overlapEmail, setOverlapEmail] = useState(false);

  // const { data, error, isLoading } = useEmailDoubleCheckQuery({ ['email']: inputEmail });
  const [emailDoubleCheck] = useEmailDoubleCheckMutation();

  const [sendEmailValidateCode] = useSendEmailValidateCodeMutation();

  const checkEmailValidation = (currentEmail: string) => {
    const { emailRegex } = formRegex;
    if (!emailRegex.test(currentEmail)) {
      return setRequired(true);
    }
    setRequired(false);
    setAllChecked({ ...allChecked, email: true });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setInputEmail(currentEmail);
    checkEmailValidation(currentEmail);
    setAllChecked({ ...allChecked, email: true });
  };

  const handleEmailDoubleCheck = async () => {
    if (inputEmail.length === 0) {
      return sw.toast.warn('이메일을 입력하세요.');
    }
    if (overlapEmail) {
      return sw.toast.warn('중복된 이메일입니다.<br>다시 입력하세요.');
    }

    // if (error) {
    //   sw.toast.error('사용할 수 없는 이메일입니다.');
    // }
    // if (!data) {
    //   return;
    // }
    try {
      const response = await emailDoubleCheck({ email: inputEmail });
      console.log(response);
      sw.toast.success('사용 가능한 이메일입니다.');
      setTimeout(() => {
        setOverlapEmail(false);
      }, 1000);
    } catch {
      throw new Error('error');
    }
  };

  const handleEmailValidationButtonClick = async () => {
    // 이메일 인증코드 발송
    sw.toast.success('인증코드가 발송되었습니다.<br>이메일을 확인하세요.');
    try {
      const response = await sendEmailValidateCode({ email: inputEmail });
      console.log(response);
    } catch {
      console.log('error');
    }
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
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
          backgroundColor={`${palette.black[100]}`}
          onClick={handleEmailValidationButtonClick}
        >
          인증하기
        </Button>
      </SWrapper>
    </EmailCheckFormBlock>
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
