import StardiumEdit from '@/components/Stardium/StardiumEdit';
import { clearStardiumWrite } from '@/store/stardiumWriteSlice';
import { RootState } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const StardiumUploadPage = () => {
  const write = useSelector((state: RootState) => state.stardiumWrite);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // unMount 되었을 때 initailValue 초기화
    return () => {
      dispatch(clearStardiumWrite());
    }
  },[dispatch])

  return <StardiumEdit write={write} />;
};

export default StardiumUploadPage;
