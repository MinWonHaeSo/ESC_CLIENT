import { NotificationTabList } from '@/constants/notificationTab';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';

interface NotificationTabProps {
  currentTab: number;
  onTabClick: (index: number) => void;
}

const NotificationTab = ({ currentTab, onTabClick }: NotificationTabProps) => {
  return (
    <TabList>
      {NotificationTabList.map(tab => (
        <Tab key={tab.id} isActive={currentTab === tab.id ? true : false} onClick={() => onTabClick(tab.id)}>
          {tab.name}
        </Tab>
      ))}
    </TabList>
  );
};

export default NotificationTab;

const TabList = styled.ul`
  position: -webkit-sticky;
  position: sticky;
  top: 80px;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  background-color: #fff;
  z-index: 999;
`;

const Tab = styled.li<{ isActive: boolean }>`
  padding: 6px;
  width: 70px;
  font-size: ${typo.base};
  font-weight: 600;
  color: ${({ isActive }) => (isActive ? `${palette.black[200]}` : `${palette.grey[300]}`)};
  background-color: #fff;
  border-bottom: ${({ isActive }) => (isActive ? `4px solid ${palette.black[200]}` : '')};
  text-align: center;
`;
