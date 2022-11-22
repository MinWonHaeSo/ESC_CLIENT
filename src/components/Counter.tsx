import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { up } from '../store/testSlice';
import { serviceData } from '../api/service';

interface CounterProps {
  children: React.ReactNode;
}

const Counter = () => {
  const [state, setState] = useState<any>({});
  const dispatch = useAppDispatch();
  const count = useSelector((state: RootState) => state.testSlice.value);

  useEffect(() => {
    serviceData().then(data => setState(data));
  }, []);

  console.log(state);
  return (
    <Wrapper>
      <div css={testCss}>{count}</div>
      <button onClick={() => dispatch(up(2))}>plus</button>
      <div style={{ marginTop: '50px' }}>
        {state?.userId} | {state.id} | {state.title}
      </div>
    </Wrapper>
  );
};

export default Counter;

// style
const Wrapper = styled.div`
  background-color: white;
`;

const testCss = css`
  font-size: 3rem;
  color: black;
`;
