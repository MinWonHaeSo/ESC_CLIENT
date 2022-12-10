import usePrevious from '@/hooks/usePrevious';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import Button from '../common/atoms/Button';
import Title from '../common/atoms/Title';
import InsertImage from '../common/InsertImage';
import Responsive from '../common/Responsive';
import UserInfoDetail from './UserInfoDetail';

interface UserInfoProps {}

const UserInfo = (props: UserInfoProps) => {
  const [editDisabled, setEditDisabled] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [doubleCheck, setDoubleCheck] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleEditClick = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
    setEditDisabled(false);
  };

  const handleCompleteClick = () => {
    if (!inputValue) {
      return sw.toast.warn('닉네임을 입력하세요.');
    }
    if (inputValue.length < 3) {
      return sw.toast.warn('최소 3자 이상의 닉네임을 입력하세요.');
    }

    sw.toast.success('수정이 완료되었습니다.');
    setEditDisabled(true);
    setDoubleCheck(false);
  };

  const handleProfileDeleteClick = () => {
    // [] 유저 데이터 서버에 Delete request 추가하기
    setTimeout(() => navigate('/signout'), 500);
  };
  console.log(inputRef);

  return (
    <UserInfoBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`}>내 정보</Title>
        <Button type="button" size={'medium'} backgroundColor={palette.primary['point']} onClick={handleEditClick}>
          프로필 편집
        </Button>
      </TitleWrapper>
      <InsertImage editDisabled={editDisabled} />
      <UserInfoDetail
        editDisabled={editDisabled}
        inputValue={inputValue}
        setInputValue={setInputValue}
        doubleCheck={doubleCheck}
        setDoubleCheck={setDoubleCheck}
        inputRef={inputRef}
      />
      {editDisabled ? null : (
        <SWrapper>
          <Button
            type={'button'}
            size={'large'}
            backgroundColor={`${palette.black[100]}`}
            onClick={handleCompleteClick}
          >
            수정완료
          </Button>
          <DeleteProfile onClick={handleProfileDeleteClick}>회원탈퇴</DeleteProfile>
        </SWrapper>
      )}
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
`;

const DeleteProfile = styled.div`
  margin: 2rem 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  width: 280px;
  border-top: 1px solid ${palette.grey[200]};
  border-bottom: 1px solid ${palette.grey[200]};
  font-weight: 500;
  text-align: center;

  &:hover {
    font-weight: 600;
    background-color: ${palette.grey[100]};
    color: ${palette.primary['red']};
  }
`;
