import { NotificationTabList } from '@/constants/notificationTab';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';

interface NotificationProps {}

const Notification = ({}: NotificationProps) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <NotificationBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`} marginTop={'20px'}>
          알림 내역
        </Title>
        <TotalNotification>
          <span>3 </span>개
        </TotalNotification>
      </TitleWrapper>
      <TabList>
        {NotificationTabList.map(tab => (
          <Tab key={tab.id} isActive={currentTab === tab.id ? true : false} onClick={() => handleTabClick(tab.id)}>
            {tab.name}
          </Tab>
        ))}
      </TabList>
      <StyledLine />
      <NotificationList>
        <Li>
          <Link to={''}>
            <SWrapper>
              <NotificationId></NotificationId>
              <Message>홍길동이 리뷰를 작성하였습니다.</Message>
            </SWrapper>
            <LocalDateTime>2022-12-15 03:25</LocalDateTime>
          </Link>
        </Li>
        <Li>
          <Link to={''}>
            <SWrapper>
              <NotificationId></NotificationId>
              <Message>홍길동이 리뷰를 작성하였습니다.</Message>
            </SWrapper>
            <LocalDateTime>2022-12-15 03:25</LocalDateTime>
          </Link>
        </Li>
        <Li>
          <Link to={''}>
            <SWrapper>
              <NotificationId></NotificationId>
              <Message>홍길동이 리뷰를 작성하였습니다.</Message>
            </SWrapper>
            <LocalDateTime>2022-12-15 03:25</LocalDateTime>
          </Link>
        </Li>
        <Li>
          <Link to={''}>
            <SWrapper>
              <NotificationId></NotificationId>
              <Message>홍길동이 리뷰를 작성하였습니다.</Message>
            </SWrapper>
            <LocalDateTime>2022-12-15 03:25</LocalDateTime>
          </Link>
        </Li>
        <Li>
          <Link to={''}>
            <SWrapper>
              <NotificationId></NotificationId>
              <Message>홍길동이 리뷰를 작성하였습니다.</Message>
            </SWrapper>
            <LocalDateTime>2022-12-15 03:25</LocalDateTime>
          </Link>
        </Li>
        <Li>
          <Link to={''}>
            <SWrapper>
              <NotificationId></NotificationId>
              <Message>홍길동이 리뷰를 작성하였습니다.</Message>
            </SWrapper>
            <LocalDateTime>2022-12-15 03:25</LocalDateTime>
          </Link>
        </Li>
      </NotificationList>
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
  span {
    font-size: ${typo.xxLarge};
    color: ${palette.primary['green']};
  }
`;

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

const StyledLine = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 80px;
  margin-bottom: 1rem;
  width: 100%;
  height: 1px;
  background-color: ${palette.grey[200]};
`;

const NotificationList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Li = styled.li`
  position: relative;
  padding: 8px 20px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${palette.grey[100]};
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

const NotificationId = styled.span`
  display: inline-block;
  margin: 7px 8px 0 0;
  width: 10px;
  height: 10px;
  border: 1px solid ${palette.grey[200]};
  border-radius: 50%;
  background-color: ${palette.primary.green};
`;

const Message = styled.p`
  margin-bottom: 12px;
  font-size: ${typo.base};
  font-weight: 500;
`;

const LocalDateTime = styled.div`
  font-size: ${typo.small};
  color: ${palette.grey[400]};
`;
