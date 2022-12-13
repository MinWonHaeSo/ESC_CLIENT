import React, { useState } from 'react';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import Input from '../common/atoms/Input';
import Label from '../common/atoms/Label';
import RequiredMessage from './RequiredMessage';
import { AllCheckedState } from './SignUpForm';
import { useAppDispatch } from '@/store/store';
import { setNickname } from '@/store/userSlice';
import { useEffect } from 'react';
import { checkNickNameValidation } from './formValidation';

interface NickNameProps {
  allChecked: AllCheckedState;
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>;
}

const NickName = ({ allChecked, setAllChecked }: NickNameProps) => {
  const [nickName, setNickName] = useState<string>('');
  const [required, setRequired] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allChecked.nickName) {
      dispatch(setNickname(nickName));
    }
  }, [allChecked]);

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentNickName = e.target.value;
    setNickName(currentNickName);
    checkNickNameValidation(currentNickName, setRequired, setAllChecked, allChecked);
  };

  return (
    <NicknameBlock>
      <Label htmlFor={'nickname'} required={required}>
        닉네임
      </Label>
      <Desc>다른 유저와 겹치지 않도록 입력해주세요 (2 ~ 15자)</Desc>
      <Input
        type="text"
        value={nickName}
        id="nickname"
        placeholder="닉네임 입력(2~15자)"
        onChange={handleNickNameChange}
        required={required}
      />
      <RequiredMessage required={required} />
    </NicknameBlock>
  );
};

export default NickName;

const NicknameBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
`;

const Desc = styled.p`
  font-size: ${typo.micro};
  color: ${palette.black[200]};
`;
