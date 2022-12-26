import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import ScrollToTopButton from '../common/ScrollToTopButton';
import NotificationRead from './NotificationRead';
import NotificationTab from './NotificationTab';
import NotificationUnread from './NotificationUnread';

export type TabType = 'read' | 'unRead';

interface NotificationProps {}

const Notification = ({}: NotificationProps) => {
  const [currentTab, setCurrentTab] = useState<TabType>('unRead');
  const { content, isLast, nextPage, totalCount } = useSelector((state: RootState) => state.notification);

  const handleChangeTab = (tab: TabType) => {
    setCurrentTab(tab);
  };

  return (
    <NotificationBlock>
      <TitleWrapper>
        <Title fontSize={typo.xxLarge} marginTop={'20px'}>
          알림 내역
        </Title>
        <TotalNotification>
          <div>
            <span>{totalCount} </span>개
          </div>
        </TotalNotification>
      </TitleWrapper>
      <NotificationTab currentTab={currentTab} onTabClick={handleChangeTab} />
      <StyledLine />
      {currentTab === 'read' ? <NotificationRead content={content} /> : <NotificationUnread content={content} />}
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
