import { useRequestUserInfoMutation } from '@/api/authApi';
import { sustainLogin } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';

export const useCheckLogin = async () => {
  const [requestUserInfoAPI] = useRequestUserInfoMutation();
  const dispatch = useAppDispatch();
  if (localStorage.getItem('accessToken')) {
    //accessToken이 있는 지 체크

    const accessToken = localStorage.getItem('accessToken');
    console.log(localStorage.getItem('accessToken'));
    const userType = localStorage.getItem('userType');

    const userData = await requestUserInfoAPI('').unwrap();
    console.log(userData);
    if (userData) {
      const { email, nickname, imgUrl } = userData;
      dispatch(
        sustainLogin({
          email: email,
          nickname: nickname,
          image: imgUrl,
          userType: userType,
          accessToken: accessToken,
          loggedIn: true,
        }),
      );
      console.log('로그인 유지 중');
    }
  }
};
