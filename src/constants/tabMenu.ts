import { UserType } from '@/types/userType';

interface Tab {
  id: number;
  name: string;
  type: UserType;
}

export const tabMenus: Tab[] = [
  {
    id: 0,
    name: '일반 사용자',
    type: 'USER',
  },
  {
    id: 1,
    name: '판매자',
    type: 'MANAGER',
  },
];
