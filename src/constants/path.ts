const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  SIGN_OUT: '/signout',
  SEARCH_PASSWORD: '/searchpassword',
  ME: '/mypage',
  ME_RENTAL_LIST: '/me/rental',
  ME_RECENT_SEARCH_LIST: '/me/recentsearch',
  ME_LIKE_STADIUM_LIST: '/me/likestadium',
  ME_NOTIFICATION: '/me/notification',
  STADIUM_DETAIL: '/stadium/detail',
  STADIUM_RENTAL: '/stadium/rental',
  MANAGER_STADIUM_UPLOAD: '/manager/stadium/upload',
  MANAGER_RESERVATION_LIST: '/manager/reservation',
  MANAGER_RESERVATION_DETAILS: '/manager/reservation/details',
  MANAGER_HOME: '/manager/home',
} as const;

export default PATH;
