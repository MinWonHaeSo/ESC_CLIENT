import { Notification, notificationApi, useReadNotificationMutation } from '@/api/notificationApi';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { clearNotification } from '@/store/notificationSlice';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import EmptyItemNotification from '../common/EmptyItemNotification';
import Loading from '../common/Loading/Loading';

interface NotificationUnreadProps {
  content: Notification[];
}

const NotificationUnread = ({ content }: NotificationUnreadProps) => {
  const [readNotificationAPI, { isLoading: readMutationIsLoading }] = useReadNotificationMutation();
  const [unReadtrigger] = notificationApi.endpoints.getUnreadNotification.useLazyQuery();
  const navigate = useNavigate();
  const { isLast, nextPage } = useSelector((state: RootState) => state.notification);
  const dispatch = useAppDispatch();

  const fetchNextPage = () => {
    if (isLast) return;
    const page = nextPage ? nextPage : 0;
    unReadtrigger(page.toString()).refetch();
  };

  const $observerTarget = useInfinityScroll(fetchNextPage);

  const handleNotificationClick = useCallback(async (notificationId: string, notificationUrl: string) => {
    const response = await readNotificationAPI(notificationId);
    try {
      if (response) {
        navigate(notificationUrl);
        console.log('읽음 처리 되었습니다.');
      }
    } catch (error) {
      console.log(error);
      console.error('알림 내역을 다시 가져오는데 실패하였습니다.');
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearNotification());
    };
  }, [dispatch]);

  if (readMutationIsLoading) {
    return <Loading />;
  }

  return (
    <Container>
      {content.map(notification => (
        <Li key={notification.id}>
          <button onClick={() => handleNotificationClick(notification.id, notification.url)}>
            <SWrapper>
              <NotificationId />
              <Message>{notification.message}</Message>
            </SWrapper>
            <LocalDateTime>
              {notification.createdAt.slice(0, 3).join('/')} {notification.createdAt.slice(3).join(':')}
            </LocalDateTime>
          </button>
        </Li>
      ))}
      {content.length === 0 ? <EmptyItemNotification message={'알림을 모두 확인하였습니다'} btnActive={false} /> : null}
      <div ref={$observerTarget} />
    </Container>
  );
};

export default NotificationUnread;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Li = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 20px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${palette.grey[100]};
  border-bottom: 1.5px solid ${palette.primary['green']};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  text-align: start;

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

const NotificationId = styled.span`
  display: inline-block;
  margin: 8px 8px 0 0;
  width: 10px;
  height: 10px;
  border: 1px solid ${palette.grey[200]};
  border-radius: 50%;
  background-color: ${palette.primary.green};
`;

const Message = styled.p`
  width: 290px;
  margin-bottom: 12px;
  font-size: ${typo.base};
  font-weight: 500;
  text-align: start;
`;

const LocalDateTime = styled.div`
  font-size: ${typo.small};
  color: ${palette.grey[400]};
  text-align: start;
`;
