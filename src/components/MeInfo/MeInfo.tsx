import { useChangeUserInfoMutation } from '@/api/authApi';
import { userFileUpload } from '@/api/fileUpload';
import MILLI_SECONDS from '@/constants/milliSeconds';
import PATH from '@/constants/path';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import { changeNickname, uploadImage } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import Button from '../common/atoms/Button';
import Title from '../common/atoms/Title';
import Loading from '../common/Loading/Loading';
import Responsive from '../common/Responsive';
import MeInfoDetail from './MeInfoDetail';
import MePassword from './MePassword';

interface MeInfoProps {}

const MeInfo = (props: MeInfoProps) => {
  const [editDisabled, setEditDisabled] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cloudImage, setCloudImage] = useState<File>();
  const [cloudinaryApiLoading, setCloudinaryApiLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [changeUserInfoAPI, { isLoading }] = useChangeUserInfoMutation();
  const dispatch = useAppDispatch();

  const handleEditClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
    setEditDisabled(false);
  }, []);

  const handleCompleteClick = async () => {
    if (!inputValue) {
      return sw.toast.warn('닉네임을 입력하세요.');
    }
    if (inputValue.length < 2) {
      return sw.toast.warn('최소 2자 이상의 닉네임을 입력하세요.');
    }
    dispatch(changeNickname(inputValue));
    setCloudinaryApiLoading(true);

    try {
      const cloudinaryResponse = await userFileUpload(cloudImage);
      setCloudinaryApiLoading(false);
      const response = await changeUserInfoAPI({ nickname: inputValue, imgUrl: cloudinaryResponse?.data.url }).unwrap();
      if (response) {
        dispatch(uploadImage(response.imgUrl));
        sw.toast.success('수정이 완료되었습니다.');
        setEditDisabled(true);
        setNicknameCheck(false);
        setShowPassword(false);
      }
    } catch {
      console.error('회원 정보를 수정하는 데 문제가 발생하였습니다.');
    }
  };
  const handleChangePassword = () => {
    setShowPassword(true);
  };

  const handleProfileDeleteClick = () => {
    setTimeout(() => navigate(`${PATH.SIGN_OUT}`), MILLI_SECONDS.half);
  };

  return (
    <MeInfoContainer>
      {cloudinaryApiLoading || isLoading ? <Loading /> : null}
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`}>내 정보</Title>
        <Button type="button" size={'medium'} backgroundColor={palette.primary['point']} onClick={handleEditClick}>
          프로필 편집
        </Button>
      </TitleWrapper>
      <MeInfoDetail
        editDisabled={editDisabled}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setNicknameCheck={setNicknameCheck}
        inputRef={inputRef}
        setCloudImage={setCloudImage}
      />

      {showPassword ? (
        <MePassword showPassword={showPassword} setShowPassword={setShowPassword} setEditDisabled={setEditDisabled} />
      ) : null}

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
          <SWrapper>
            <HiddenChangeProfile profile="password" onClick={handleChangePassword}>
              비밀번호 변경
            </HiddenChangeProfile>
            <HiddenChangeProfile profile="signout" onClick={handleProfileDeleteClick}>
              회원탈퇴
            </HiddenChangeProfile>
          </SWrapper>
        </SWrapper>
      )}
    </MeInfoContainer>
  );
};

export default MeInfo;

const MeInfoContainer = styled.section`
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

const HiddenChangeProfile = styled.div<{ profile: 'password' | 'signout' }>`
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 0.75rem 0;
  width: 280px;
  border: 1px solid ${palette.grey[200]};
  border-radius: 10px;
  font-weight: 500;
  text-align: center;
  color: ${palette.grey[300]};
  ${props => props.profile === 'password' && 'margin-top: 2rem; margin-bottom: 0'};
  ${props => props.profile === 'signout' && 'margin-top: 1rem; margin-bottom: 2rem '};

  &:hover {
    font-weight: 600;
    color: ${palette.black[200]};
    background-color: ${palette.grey[100]};
  }
`;
