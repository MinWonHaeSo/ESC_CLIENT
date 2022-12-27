import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useCheckUnreadNotificationQuery } from '@/api/notificationApi';
import { RootState } from '@/store/store';
import PATH from '@/constants/path';
import palette from '@/lib/styles/palette';
import Loading from '../common/Loading/Loading';

interface NotificationButton {
  onListClick: () => void;
}

const NotificationButton = ({ onListClick }: NotificationButton) => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const { currentData = { cnt: 0, result: true }, isLoading: unreadIsLoading } = useCheckUnreadNotificationQuery('');

  if (unreadIsLoading || !currentData) {
    return <Loading />;
  }

  const notificationFigure = currentData.result as boolean;
  console.log(notificationFigure);
  return (
    <NotificationButtonBlock onClick={onListClick}>
      <NotificationLink to={PATH.ME_NOTIFICATION}>
        <i className="fa-regular fa-bell" />
      </NotificationLink>
      {loggedIn ? <NotificationStatus unRead={notificationFigure}></NotificationStatus> : null}
    </NotificationButtonBlock>
  );
};

export default NotificationButton;

const NotificationButtonBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 3rem;
  width: 100%;
  height: 20px;
  z-index: 9999;
`;

const NotificationLink = styled(Link)`
  margin: 1rem 1rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid ${palette.grey[200]};
  border-radius: 10px;
  background-color: #fff;
  font-size: 21px;
  color: ${palette.grey[500]};
  transition: all 0.01s ease-out;
`;

const NotificationStatus = styled.span<{ unRead: boolean }>`
  position: absolute;
  top: -12px;
  right: 12px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ unRead }) => (unRead ? `${palette.primary['green']}` : 'transparent')};
`;
