import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useEmailDoubleCheckMutation, useSendEmailValidateCodeMutation } from '@/api/userApi';
import { useAppDispatch } from '@/store/store';
import { setEmail } from '@/store/userSlice';
import palette from '@/lib/styles/palette';
import sw from '@/lib/utils/customSweetAlert';
import MILLI_SECONDS from '@/constants/milliSeconds';
import Loading from '../../common/Loading/Loading';
import Input from '../../common/atoms/Input';
import Button from '../../common/atoms/Button';
import Label from '../../common/atoms/Label';
import { checkEmailValidation } from '../formValidation';
import { AllCheckedState } from '../SignUpForm';
import RequiredMessage from '../RequiredMessage';
import EmailValidation from './EmailValidation';

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

  const [emailDoubleCheckAPI] = useEmailDoubleCheckMutation();
  const [sendEmailValidateCodeAPI, { isLoading }] = useSendEmailValidateCodeMutation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setInputEmail(currentEmail);
    checkEmailValidation({ currentEmail, setRequired, setAllChecked, allChecked });
    setAllChecked({ ...allChecked, email: true });
  };

  const handleEmailDoubleCheck = async () => {
    if (inputEmail.length === 0) {
      return sw.toast.warn('???????????? ???????????????.');
    }
    try {
      const response = await emailDoubleCheckAPI({ email: inputEmail }).unwrap();
      if (response) {
        sw.toast.success(`??????????????? ?????????????????????.`);
        setTimeout(() => {
          setValidateProcess({ ...validateProcess, emailOverlapCheck: true });
        }, MILLI_SECONDS.one);
      }
    } catch (error) {
      sw.toast.warn('????????? ????????? ?????????.');
      throw new Error('????????? ????????? ?????????.');
    }
  };

  const handleEmailValidationButtonClick = async () => {
    // ????????? ???????????? ??????
    if (!emailOverlapCheck) {
      return sw.toast.warn('????????? ?????? ????????? ?????? ????????????.');
    }
    try {
      const response = await sendEmailValidateCodeAPI({ email: inputEmail });
      if (response) {
        sw.toast.success('??????????????? ?????????????????????.<br>???????????? ???????????????.');
        setTimeout(() => {
          setValidateProcess({ ...validateProcess, validationActive: true });
        }, MILLI_SECONDS.one);
      }
    } catch {
      throw new Error('????????? ?????? ????????? ??????????????????.');
    }
  };
  useEffect(() => {
    if (validationComplete) {
      dispatch(setEmail(inputEmail));
    }
  }, [validationComplete]);

  return (
    <>
      {isLoading && <Loading />}
      <EmailCheckFormBlock>
        <EmailCheck>
          <Label htmlFor={'email'} required={required}>
            ?????????
          </Label>
          <DoubleCheckButton
            type="button"
            size={'small'}
            color={`${palette.grey[500]}`}
            backgroundColor={`${palette.grey[200]}`}
            onClick={handleEmailDoubleCheck}
          >
            ????????????
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
            ????????? ????????????
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
