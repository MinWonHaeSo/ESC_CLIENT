import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '@/store/store';
import { setName } from '@/store/userSlice';
import Input from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';
import RequiredMessage from '../RequiredMessage';
import { AllCheckedState } from '../SignUpForm';

interface UserNameProps {
  allChecked: AllCheckedState;
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>;
}

const UserName = ({ allChecked, setAllChecked }: UserNameProps) => {
  const [userName, setUserName] = useState<string>('');
  const [required, setRequired] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserName(value);
    if (value.length < 2) {
      return setRequired(true);
    }
    setRequired(false);
    setAllChecked({ ...allChecked, userName: true });
  };

  useEffect(() => {
    if (allChecked.userName) {
      dispatch(setName(userName));
    }
  }, [allChecked]);

  return (
    <UserNameBlock>
      <Label htmlFor={'email'} required={required}>
        사용자명
      </Label>
      <Input
        value={userName}
        type="text"
        id="userName"
        placeholder="이름을 입력하세요"
        onChange={handleUserNameChange}
        required={required}
      />
      <RequiredMessage required={required} />
    </UserNameBlock>
  );
};

export default UserName;

const UserNameBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
`;
