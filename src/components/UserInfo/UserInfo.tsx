import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import Button from '../common/atoms/Button';
import Title from '../common/atoms/Title';
import InsertImage from '../common/InsertImage';
import Responsive from '../common/Responsive';
import UserInfoDetail from './UserInfoDetail';

interface UserInfoProps {}

const UserInfo = (props: UserInfoProps) => {
  const [inputDisabled, setInputDisabled] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [doubleCheck, setDoubleCheck] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
    setInputDisabled(false);
  };

  const handleCorrectClick = () => {
    if (!inputValue) {
      return sw.toast.warn('닉네임을 입력하세요.');
    }
    sw.toast.success('수정이 완료되었습니다.');
    setInputDisabled(true);
    setDoubleCheck(false);
  };

  return (
    <UserInfoBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`}>내 정보</Title>
        <Button type="button" size={'medium'} backgroundColor={palette.primary['point']} onClick={handleEditClick}>
          프로필 편집
        </Button>
      </TitleWrapper>
      <InsertImage inputDisabled={inputDisabled} />
      <UserInfoDetail
        inputDisabled={inputDisabled}
        inputValue={inputValue}
        setInputValue={setInputValue}
        doubleCheck={doubleCheck}
        setDoubleCheck={setDoubleCheck}
        inputRef={inputRef}
      />
      <SWrapper>
        {inputDisabled ? null : (
          <Button type={'button'} size={'large'} backgroundColor={`${palette.black[100]}`} onClick={handleCorrectClick}>
            수정완료
          </Button>
        )}
      </SWrapper>
    </UserInfoBlock>
  );
};

export default UserInfo;

const UserInfoBlock = styled.section`
  width: 100%;
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
`;
