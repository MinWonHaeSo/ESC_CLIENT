import {
  useGetReadNotificationQuery,
  useGetUnreadNotificationQuery,
  useReadNotificationMutation,
} from '@/api/notificationApi';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useState } from 'react';
import Title from '../common/atoms/Title';
import Loading from '../common/Loading/Loading';
import Responsive from '../common/Responsive';
import ScrollToTopButton from '../common/ScrollToTopButton';
import NotificationList from './NotificationList';
import NotificationTab from './NotificationTab';

interface NotificationProps {}

const Notification = ({}: NotificationProps) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const {
    data: readData,
    isLoading: readDataIsLoading,
    refetch: readDataRefetch,
  } = useGetReadNotificationQuery('', { refetchOnMountOrArgChange: true });

  const {
    data: unReadData,
    isLoading: unReadDataIsLoading,
    refetch: unReadDataRefetch,
  } = useGetUnreadNotificationQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const [readNotificationAPI, { isLoading: readMutationIsLoading }] = useReadNotificationMutation();

  console.log(unReadData);
  console.log(readData);

  const handleTabClick = (index: number) => {
    setCurrentTab(index);
    if (index === 0) {
      unReadDataRefetch();
    }
    if (index === 1) {
      readDataRefetch();
    }
  };

  const handleNotificationClick = useCallback(async (notificationId: number) => {
    const response = await readNotificationAPI(notificationId);
    try {
      if (response) {
        console.log('읽음 처리 되었습니다.');
      }
    } catch (error) {
      console.log(error);
      console.error('알림 내역을 다시 가져오는데 실패하였습니다.');
    }
  }, []);

  if (readDataIsLoading || !readData || !unReadData || readMutationIsLoading) {
    return <Loading />;
  }

  if (unReadDataIsLoading || !unReadData) {
    return <Loading />;
  }

  const readNotificationData = readData.content;
  const unReadNotificationData = unReadData.content;

  return (
    <NotificationBlock>
      <TitleWrapper>
        <Title fontSize={typo.xxLarge} marginTop={'20px'}>
          알림 내역
        </Title>
        <TotalNotification>
          {currentTab === 0 ? (
            <div>
              <span>{unReadData.totalElements} </span>개
            </div>
          ) : (
            <div>
              <span>{readData.totalElements} </span>개
            </div>
          )}
        </TotalNotification>
      </TitleWrapper>
      <NotificationTab currentTab={currentTab} onTabClick={handleTabClick} />
      <StyledLine />
      <NotificationList
        currentTab={currentTab}
        onNotificationClick={handleNotificationClick}
        readNotificationData={readNotificationData}
        unReadNotificationData={unReadNotificationData}
      />
      {unReadNotificationData.length === 0 || readNotificationData.length < 2 ? <StyledPadding /> : null}
      <ScrollToTopButton />
    </NotificationBlock>
  );
};

export default Notification;

const NotificationBlock = styled.section`
  position: relative;
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
`;

const TotalNotification = styled.div`
  margin-right: 8px;
  font-weight: 600;
  div {
    span {
      font-size: ${typo.xxLarge};
      color: ${palette.primary['green']};
    }
  }
`;

const StyledLine = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 80px;
  margin-bottom: 1rem;
  width: 100%;
  height: 1px;
  background-color: ${palette.grey[200]};
`;

const StyledPadding = styled.div`
  height: 210px;
`;
