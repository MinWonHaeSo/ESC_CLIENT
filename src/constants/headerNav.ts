import PATH from './path';

type HeaderNavItemType = {
  id: number;
  to: string;
  title: string;
  icon: string;
};

const HEADER_NAV: { [key: string]: HeaderNavItemType[] } = {
  USER: [
    { id: 1, to: PATH.ME, title: '마이 페이지', icon: '' },
    { id: 2, to: PATH.ME_RENTAL_LIST, title: '예약 내역', icon: '' },
    { id: 3, to: PATH.ME_RECENT_SEARCH_LIST, title: '최근 본 체육관', icon: '' },
    { id: 4, to: PATH.ME_LIKE_STADIUM_LIST, title: '찜한 체육관', icon: '' },
  ],
  MANAGER: [
    { id: 1, to: PATH.ME, title: '마이 페이지', icon: '' },
    { id: 2, to: PATH.MANAGER_STADIUM_UPLOAD, title: '체육관 등록', icon: '' },
    { id: 3, to: PATH.MANAGER_RESERVATION_LIST, title: '내가 올린 체육관', icon: '' },
  ],
};

export default HEADER_NAV;
