import { Notification } from '@/api/notificationApi';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import EmptyItemNotification from '../common/EmptyItemNotification';

interface NotificationListProps {
  currentTab: number;
  unReadNotificationData: Notification[];
  readNotificationData: Notification[];
  onNotificationClick: (notificationId: number) => void;
}

const NotificationList = ({
  currentTab,
  unReadNotificationData,
  readNotificationData,
  onNotificationClick,
}: NotificationListProps) => {
  return (
    <NotificationListBlock>
      {currentTab === 0 &&
        unReadNotificationData.map(notification => (
          <Li key={notification.id} onClick={() => onNotificationClick(notification.id)} currentTab={currentTab}>
            <Link to={notification.url}>
              <SWrapper>
                <NotificationId currentTab={currentTab} />
                <Message>{notification.message}</Message>
              </SWrapper>
              <LocalDateTime>
                {notification.createdAt.slice(0, 3).join('/')} {notification.createdAt.slice(3).join(':')}
              </LocalDateTime>
            </Link>
          </Li>
        ))}
      {currentTab === 1 &&
        readNotificationData.map(notification => (
          <Li key={notification.id} currentTab={currentTab}>
            <Link to={''}>
              <SWrapper>
                <NotificationId currentTab={currentTab} />
                <Message>{notification.message}</Message>
              </SWrapper>
              <LocalDateTime>
                {notification.createdAt.slice(0, 3).join('/')} {notification.createdAt.slice(3).join(':')}
              </LocalDateTime>
            </Link>
          </Li>
        ))}

      {unReadNotificationData.length === 0 && currentTab === 0 ? (
        <EmptyItemNotification message={'알림을 모두 확인하였습니다'} btnActive={false} />
      ) : null}
      {readNotificationData.length === 0 && currentTab === 1 ? (
        <EmptyItemNotification message={'알림을 모두 확인하였습니다'} btnActive={false} />
      ) : null}
    </NotificationListBlock>
  );
};

export default NotificationList;

const NotificationListBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Li = styled.li<{ currentTab: number }>`
  position: relative;
  padding: 12px 20px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${palette.grey[100]};
  border-bottom: ${({ currentTab }) =>
    currentTab === 0 ? `1.5px solid ${palette.primary['green']}` : `1px solid ${palette.grey[100]}`};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  &:hover {
    i {
      display: block;
    }
  }

  i {
    display: none;
    position: absolute;
    top: 50%;
    right: 20px;
    font-size: 24px;
    transform: translateY(-50%);
  }
`;

const SWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const NotificationId = styled.span<{ currentTab: number }>`
  display: inline-block;
  margin: 8px 8px 0 0;
  width: 10px;
  height: 10px;
  border: 1px solid ${palette.grey[200]};
  border-radius: 50%;
  background-color: ${({ currentTab }) => (currentTab === 0 ? `${palette.primary.green}` : `${palette.grey[300]}`)};
`;

const Message = styled.p`
  width: 290px;
  margin-bottom: 12px;
  font-size: ${typo.base};
  font-weight: 500;
`;

const LocalDateTime = styled.div`
  font-size: ${typo.small};
  color: ${palette.grey[400]};
`;
