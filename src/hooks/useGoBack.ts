import { useCallback } from 'react';
import { useNavigate } from 'react-router';

export const useGoBack = () => {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return goBack;
};
