import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { clearStadiumWrite } from '@/store/stadiumWriteSlice';
import StadiumEdit from '@/components/Stadium/StadiumEdit';

const StadiumUploadPage = () => {
  const write = useSelector((state: RootState) => state.stadiumWrite);
  const dispatch = useDispatch();

  useEffect(() => {
    // unMount 되었을 때 initailValue 초기화
    return () => {
      dispatch(clearStadiumWrite());
    };
  }, [dispatch]);

  return <StadiumEdit write={write} />;
};

export default StadiumUploadPage;
