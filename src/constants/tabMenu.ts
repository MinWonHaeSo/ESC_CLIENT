type UserType = 'user' | 'manager';

interface Tab {
  id: number;
  name: string;
  type: UserType;
}

export const tabMenus: Tab[] = [
  {
    id: 0,
    name: '일반 사용자',
    type: 'user',
  },
  {
    id: 1,
    name: '판매자',
    type: 'manager',
  },
];
