import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const usePathHeaderOnlyLogo = () => {
  const [checkHeader, setCheckHeader] = useState(false);
  const location = useLocation();
  const checkPath = ['/login', '/signup'];

  useEffect(() => {
    const onlyLogoHeaderCheck = checkPath.includes(location.pathname);
    setCheckHeader(onlyLogoHeaderCheck);
  }, [location]);

  return checkHeader;
};

export default usePathHeaderOnlyLogo;
