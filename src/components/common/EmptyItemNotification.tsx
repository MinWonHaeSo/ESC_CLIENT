import { DEFAULT_ICONURL } from '@/constants/defaultImage';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import Button from './atoms/Button';

interface EmptyItemProps {
  message: string;
  btnActive: boolean;
  btnText?: string;
  path?: string;
}

const EmptyItemNotification = ({ message, btnActive, btnText, path }: EmptyItemProps) => {
  const navigate = useNavigate();
  return (
    <EmptyItemNotificationBlock>
      <img src={DEFAULT_ICONURL} alt="스마일" />
      <EmptyDesc>{message}</EmptyDesc>
      {btnActive && (
        <Button
          type={'button'}
          size={'large'}
          backgroundColor={`${palette.primary['green']}`}
          onClick={() => navigate(path!)}
        >
          {btnText}
          <ArrowIcon className="fa-solid fa-location-arrow" />
        </Button>
      )}
    </EmptyItemNotificationBlock>
  );
};

export default EmptyItemNotification;

const EmptyItemNotificationBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 300px;

  img {
    display: inline-block;
    margin: 20px auto;
    width: 90px;
  }
`;

const EmptyDesc = styled.p`
  color: ${palette.grey[500]};
  font-weight: 400;
`;

const ArrowIcon = styled.i`
  margin-left: 8px;
`;
