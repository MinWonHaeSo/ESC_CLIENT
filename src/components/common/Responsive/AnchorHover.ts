import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';

interface AnchorHoverProps {
  color: string;
}

const AnchorHover = css`
  border-radius: 10px;
  padding: 12px 12px;

  &:hover {
    background-color: ${palette.pointColor['point']};
    color: #fff;
    transition: all 0.2s ease-in-out;
  }
`;

export default AnchorHover;
