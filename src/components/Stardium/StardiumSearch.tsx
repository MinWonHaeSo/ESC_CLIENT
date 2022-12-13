import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Input from '@/components/common/atoms/Input';
import { useDispatch } from 'react-redux';
import kakaoService from '@/service/kakaoMapService';
import { useSearchStadiumMutation } from '@/api/stardiumApi';

interface StardiumSearchProps {}

const StardiumSearch = (props: StardiumSearchProps) => {
  const [search, setSearch] = useState('');
  const [searchStadium] = useSearchStadiumMutation();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleEnterFetch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchStadium(search);
      kakaoService.setClearMarker();
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
