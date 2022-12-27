import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { useGoBack } from '@/hooks/useGoBack';

type Props = {};

const PrevButton = (props: Props) => {
  const goBack = useGoBack();

  return (
    <Button onClick={goBack}>
      <i className="fa-solid fa-angle-left"></i>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid ${palette.black[200]};
  border-radius: 50%;
  i {
    font-size: ${typo.medium};
  }
`;

export default PrevButton;
