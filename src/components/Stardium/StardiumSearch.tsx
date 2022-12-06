import React, { useState } from 'react';
import styled from '@emotion/styled';
import Input from '@/components/common/atoms/Input';
import { useDispatch } from 'react-redux';
import { searchResultsStardium } from '@/store/stardiumSlice';

interface StardiumSearchProps {}

const StardiumSearch = (props: StardiumSearchProps) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleEnterFetch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(searchResultsStardium());
    }
  };

  return (
    <StardiumSearchConatiner>
      <Input
        id="stardiumSearch"
        type="text"
        placeholder="체육관을 검색해 주세요"
        value={search}
        onChange={handleChangeSearch}
        onKeyDown={handleEnterFetch}
      />
    </StardiumSearchConatiner>
  );
};

const StardiumSearchConatiner = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;
`;

export default StardiumSearch;
