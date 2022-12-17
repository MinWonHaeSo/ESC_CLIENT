const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/signup',
  SIGN_UP: '/signup',
  SIGN_OUT: '/signout',
  SEARCH_PASSWORD: '/searchpassword',
  ME: '/mypage',
  ME_RENTAL_LIST: '/me/rental',
  ME_RECENT_SEARCH_LIST: '/me/recentsearch',
  ME_LIKE_STADIUM_LIST: '/me/likestadium',
  ME_NOTIFICATION: '/me/notification',
  STARDIUM_DETAIL: 'stardium/detail',
  STARDIUM_RENTAL: 'stardium/rental',
  MANAGER_STARDIUM_UPLOAD: '/manager/stardium/upload',
  MANAGER_RESERVATION_LIST: '/manager/reservation',
  MANAGER_RESERVATION_DETAILS: '/manager/reservation/details',
  MANAGER_HOME: '/manager/home',
} as const;

export default PATH;
