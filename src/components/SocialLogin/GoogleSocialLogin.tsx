import { useCallback } from 'react';
import { useState } from 'react';
import GoogleLogin from 'react-google-login';

interface UserData {
  email: string;
  name: string;
  profileImage: string;
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_SOCIAL_LOGIN_KEY;

const initialUserData: UserData = {
  email: '',
  name: '',
  profileImage: '',
};

const GoogleSocialLogin = () => {
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const handleLoginSuccess = useCallback((res: any) => {
    setUserData({
      ...userData,
      email: res.profileObj.email,
      name: res.profileObj.name,
      profileImage: res.profileObj.imageUrl,
    });
  }, []);

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText=""
      onSuccess={res => handleLoginSuccess(res)}
      onFailure={res => console.error(res)}
    />
  );
};

export default GoogleSocialLogin;
