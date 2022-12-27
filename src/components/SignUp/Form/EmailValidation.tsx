import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useCheckEmailValidateMutation } from '@/api/userApi';
import { useAppDispatch } from '@/store/store';
import { setKey } from '@/store/userSlice';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import sw from '@/lib/utils/customSweetAlert';
import MILLI_SECONDS from '@/constants/milliSeconds';
import Button from '../../common/atoms/Button';
import { ValidateState } from './Email';

interface EmailValidationProps {
  required: boolean;
  validateProcess: ValidateState;
  setValidateProcess: React.Dispatch<React.SetStateAction<ValidateState>>;
}

const EmailValidation = ({ required, validateProcess, setValidateProcess }: EmailValidationProps) => {
  const [inputValidateCode, setInputValidateCode] = useState<string>('');

  const [checkEmailValidateAPI] = useCheckEmailValidateMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setKey(inputValidateCode));
  }, [inputValidateCode]);

  const handleValidateCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentNumber = e.target.value.slice(0, 6);
    setInputValidateCode(currentNumber);
  };

  const handleValidateCodeCheck = () => {
    const key = inputValidateCode;
    if (key.length !== 6) {
      return sw.toast.warn('인증코드 6자리를 입력해주세요.');
    }
    try {
      checkEmailValidateAPI(inputValidateCode);
      sw.toast.success('정상 인증 되었습니다.');
      setTimeout(() => {
        setValidateProcess({
          ...validateProcess,
          emailOverlapCheck: false,
          validationActive: false,
          validationComplete: true,
        });
      }, MILLI_SECONDS.oneHalf);
    } catch {
      throw new Error('정상 인증되지 않았습니다.');
    }
  };

  return (
    <EmailValidationBlock validationActive={validateProcess.validationActive}>
      <Desc>이메일로 전송된 인증코드를 입력해주세요.</Desc>
      <SWrapper>
        <SInput
          type={'number'}
          value={inputValidateCode}
          placeholder={'인증 코드 6자리 입력'}
          minLength={6}
          onChange={handleValidateCodeChange}
          required={required}
        />
        <Button
          type={'button'}
          size={'small'}
          backgroundColor={`${palette.black[100]}`}
          onClick={handleValidateCodeCheck}
        >
          확인
        </Button>
      </SWrapper>
    </EmailValidationBlock>
  );
};
export default EmailValidation;

const EmailValidationBlock = styled.div<{ validationActive: boolean }>`
  display: ${({ validationActive }) => (validationActive ? `flex` : 'none')};
  flex-direction: column;
  justify-content: center;
  padding: 8px 8px;
  gap: 8px;
  width: 280px;
  background-color: ${palette.grey[100]};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Desc = styled.span`
  font-size: ${typo.micro};
  color: ${palette.grey[500]};
`;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SInput = styled.input`
  margin-top: 4px;
  padding: 6px 8px;
  width: 200px;
  border: 1px solid ${palette.grey[300]};
  border-radius: 10px;
`;
