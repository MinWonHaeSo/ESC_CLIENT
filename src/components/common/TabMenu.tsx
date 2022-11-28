import { useState } from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';

interface TabMenuProps {}

const TabMenu = (props: TabMenuProps) => {
  const [tabId, setTabId] = useState<number>(0);
  const tabMenus = [
    {
      id: 0,
      name: '일반 사용자',
      title: 'user',
    },
    {
      id: 1,
      name: '판매자',
      title: 'manager',
    },
  ];
  return (
    <TabMenuBlock>
      {tabMenus.map(tab => (
        <Tab key={tab.title} name={tab.title} focus={tabId === tab.id} onClick={() => setTabId(tab.id)}>
          {tab.name}
        </Tab>
      ))}
    </TabMenuBlock>
  );
};

export default TabMenu;

type tabStyleProps = {
  name: string;
  focus: boolean;
};

const TabMenuBlock = styled.ul`
  display: flex;
  justify-content: center;
`;

const Tab = styled.li<tabStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 12px 0;
  width: 140px;
  border: 1px solid ${palette.black[100]};
  border-radius: 10px 0 0 10px;
  color: ${palette.black[100]};

  ${({ name }) => name === 'manager' && `border-radius: 0 10px 10px 0;`};

  ${({ focus }) =>
    focus &&
    `
    background-color: ${palette.black[100]};
    color: white;
  `}
`;
