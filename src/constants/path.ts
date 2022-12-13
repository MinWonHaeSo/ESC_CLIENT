const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/signup',
  FIND_PASSWORD: '/findpassword',
  SIGN_UP: '/signup',
  SIGN_OUT: '/signout',
  ME: '/mypage',
  ME_RENTAL_LIST: '',
  ME_RECENT_SEARCH_LIST: '',
  ME_LIKE_STADIUM_LIST: '',
  STARDIUM_DETAIL: 'stardium/detail',
  STARDIUM_RENTAL: 'stardium/rental',
  MANAGER_STARDIUM_UPLOAD: '/manager/stardium/upload',
  MANAGER_RESERVATION_LIST: '/manager/reservation',
  MANAGER_RESERVATION_DETAILS: '/manager/reservation/details',
  MANAGER_HOME: '/manager/home',
} as const;

export default PATH;
