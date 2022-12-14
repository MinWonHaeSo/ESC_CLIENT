import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import { changeNickname } from '@/store/authSlice';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import InsertImage from '../common/InsertImage';

interface UserInfoDetailProps {
  editDisabled: boolean;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  doubleCheck: boolean;
  setDoubleCheck: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

const UserInfoDetail = ({
  editDisabled,
  inputValue,
  setInputValue,
  doubleCheck,
  setDoubleCheck,
  inputRef,
}: UserInfoDetailProps) => {
  const authUser = useSelector((state: RootState) => state.auth);
  console.log(authUser);
  const { email, nickname, image } = authUser;
  const location = useLocation();
  const currentLocation = location.pathname;

  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setDoubleCheck(false);
    }
  };

  const handleDeleteClick = () => {
    setDoubleCheck(false);
    setInputValue('');
  };

  useEffect(() => {
    setInputValue(nickname);
  }, []);

  return (
    <InfoDetailBlock>
      <InsertImage editDisabled={editDisabled} currentImage={image} currentLocation={currentLocation} />
      <InfoDetail>
        <InfoDetailTitle>아이디</InfoDetailTitle>
        <Id email={email}>{email.length === 0 ? 'example@email.com' : email}</Id>
      </InfoDetail>
      <InfoDetail>
        <InfoDetailTitle>닉네임</InfoDetailTitle>
        <Swrapper>
          <InfoDetailInput
            value={inputValue}
            ref={inputRef}
            type="text"
            placeholder="닉네임을 입력하세요"
            disabled={editDisabled}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {inputValue && !editDisabled ? (
            <DeleteButton onClick={handleDeleteClick}>
              <i className="fa-solid fa-xmark" />
            </DeleteButton>
          ) : null}
        </Swrapper>
        <DoubleCheckButton disabled={editDisabled}>
          {inputValue.length > 1 ? (
            <i className="fa-solid fa-circle-check" />
          ) : (
            <i className="fa-regular fa-circle-check" />
          )}
        </DoubleCheckButton>
      </InfoDetail>
    </InfoDetailBlock>
  );
};

export default UserInfoDetail;

const InfoDetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 2rem;
  padding: 0 16px 32px 16px;
  background-color: ${palette.grey[100]};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const InfoDetail = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: ${typo.base};

  p {
    margin-left: 8px;
  }
`;

const InfoDetailTitle = styled.div`
  margin-right: 0.5rem;
  padding: 6px 8px;
  border: 1px solid ${palette.grey[300]};
  border-radius: 10px;
  background-color: #fff;
`;

const Id = styled.p<{ email: string }>`
  color: ${({ email }) => (email ? `${palette.black[200]}` : `${palette.grey[300]}`)};
`;
const Swrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  button {
    position: absolute;
    right: 20px;
  }
`;

const InfoDetailInput = styled.input`
  margin-right: 10px;
  padding: 8px 10px;
  color: ${palette.black[100]};
  border-radius: 10px;

  ${({ disabled }) => !disabled && `border: 1px solid ${palette.black[200]}`};

  &::placeholder {
    color: ${palette.grey[300]};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 3rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid ${palette.grey[500]};
  border-radius: 50%;
  background: transparent;
  i {
    font-size: ${typo.base};
  }
`;

const DoubleCheckButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #fff;

  i {
    font-size: ${typo.medium};
  }
`;
