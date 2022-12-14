import { TabType } from '@/components/Notification/Index';

interface NotificationTabList {
  id: TabType;
  name: string;
}

export const NotificationTabList: NotificationTabList[] = [
  {
    id: 'unRead',
    name: '미확인',
  },
  {
    id: 'read',
    name: '확인',
  },
];
