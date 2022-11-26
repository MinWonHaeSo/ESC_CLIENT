import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';

const AnchorHover = css`
  border-radius: 10px;
  padding: 12px 12px;

  &:hover {
    background-color: ${palette.primary['point']};
    color: #fff;
    transition: all 0.2s ease-in-out;
  }
`;

export default AnchorHover;
