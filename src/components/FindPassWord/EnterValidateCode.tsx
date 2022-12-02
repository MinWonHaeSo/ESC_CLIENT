import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import { changeIndex } from '@/store/findPassWordSlice';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../common/atoms/Button';
import RequiredInput from '../common/atoms/RequiredInput';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import RequiredMessage from '../SignUp/RequiredMessage';

interface EnterValidateCodeProps {}

const EnterValidateCode = (props: EnterValidateCodeProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [required, setRequired] = useState<boolean>(false);
  const [newCode, setNewCode] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const orderIndex = useSelector((state: RootState) => state.findPassWord.index);

  const checkValidationCode = (currentNumber: string) => {
    if (currentNumber.length !== 4) {
      return setRequired(true);
    }
    setRequired(false);
  };

  const handleInputNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentNumber = e.target.value.slice(0, 4);
    setInputValue(currentNumber);
    setRequired(true);
    checkValidationCode(currentNumber);
  };

  // [] 이메일로 발송된 인증코드와 입력한 인증코드가 같지 않은 경우,
  // 1. 인증코드 다시 입력 알림 띄우기
  // 2. 인증코드 다시 보내기 버튼 생성

  const handleConfirmButtonClick = () => {
    if (inputValue.length !== 4) {
      return;
    }
    if (inputValue === '1234') {
      setNewCode(true);
      return sw.toast.error('인증코드가 정확하지 않습니다.');
    }
    dispatch(changeIndex(orderIndex + 1));
  };

  const handleSendNewCodeButtonClick = () => {
    setInputValue('');
    setNewCode(false);
  };

  return (
    <EnterValidateCodeBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`}>비밀번호 찾기</Title>
      </TitleWrapper>
      <InputWrapper>
        <Label>인증코드</Label>
        <RequiredInput
          type={'number'}
          value={inputValue}
          placeholder={'인증 코드를 입력하세요.'}
          minLength={4}
          onChange={handleInputNumberChange}
          required={required}
        />
        <RequiredMessage required={required}>숫자 4자리를 입력해 주세요.</RequiredMessage>
      </InputWrapper>
      {newCode && (
        <SWrapper>
          <Button
            type={'button'}
            size={'large'}
            backgroundColor={`${palette.primary.point}`}
            onClick={handleSendNewCodeButtonClick}
          >
            인증 코드 다시 보내기
          </Button>
        </SWrapper>
      )}
      <SWrapper>
        <Button
          type={'button'}
          size={'large'}
          backgroundColor={!inputValue.length ? `${palette.grey[200]}` : `${palette.black[100]}`}
          onClick={handleConfirmButtonClick}
        >
          확 인
        </Button>
      </SWrapper>
    </EnterValidateCodeBlock>
  );
};

export default EnterValidateCode;

const EnterValidateCodeBlock = styled.div`
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  margin: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 31.5px;
  gap: 8px;
  width: 280px;
`;

const Label = styled.span`
  font-size: ${typo.small};
  font-weight: 400;
  line-height: ${typo.medium};
  color: ${palette.black[200]};
`;

const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
