import { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import ScrollToTopButton from '../common/ScrollToTopButton';
import Responsive from '../common/Responsive';
import Title from '../common/atoms/Title';
import NotificationUnread from './NotificationUnread';
import NotificationRead from './NotificationRead';
import NotificationTab from './NotificationTab';

export type TabType = 'read' | 'unRead';

interface NotificationProps {}

const Notification = ({}: NotificationProps) => {
  const [currentTab, setCurrentTab] = useState<TabType>('unRead');
  const { content, isLast, nextPage, totalCount } = useSelector((state: RootState) => state.notification);

  const handleChangeTab = (tab: TabType) => {
    setCurrentTab(tab);
  };

  return (
    <NotificationContainer>
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
    </NotificationContainer>
  );
};

export default Notification;

const NotificationContainer = styled.section`
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
