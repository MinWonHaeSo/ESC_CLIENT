import media from '@/lib/styles/media';
import { css } from '@emotion/react';

const ResponsiveWrapper = css`
  max-width: 1280px;
  margin: 0 auto;
  padding-right: 1rem;
  padding-left: 1rem;
  align-items: center;

  ${media.large} {
    max-width: 765px;
  }
`;

export default ResponsiveWrapper;
