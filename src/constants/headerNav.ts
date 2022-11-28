import PATH from './path';

const HEADER_NAV = {
  user: [
    { id: 1, to: PATH.ME, title: '마이 페이지', icon: '' },
    { id: 2, to: PATH.ME_RENTAL_LIST, title: '예약 리스트', icon: '' },
    { id: 3, to: PATH.ME_RECENT_SEARCH_LIST, title: '최근 본 체육관', icon: '' },
    { id: 4, to: PATH.ME_LIKE_STADIUM_LIST, title: '찜한 체육관', icon: '' },
  ],
  manager: [],
};

export default HEADER_NAV;
