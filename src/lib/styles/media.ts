const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

const mediaQueryMin = (minWidth: number) => `
  @media (min-width : ${minWidth}px)
`;

const media = {
  xxxlarge: mediaQuery(2200),
  xxlarge: mediaQuery(1920),
  xlarge: mediaQuery(1440),
  large: mediaQuery(1200),
  medium: mediaQuery(1024),
  small: mediaQuery(768),
  xsmall: mediaQuery(375),
  xxxlargeMin: mediaQueryMin(2200),
  xxlargeMin: mediaQueryMin(1920),
  xlargeMin: mediaQueryMin(1440),
  largeMin: mediaQueryMin(1200),
  mediumMin: mediaQueryMin(1024),
  smallMin: mediaQueryMin(768),
  xsmallMin: mediaQueryMin(375),
  custom: mediaQuery,
};

export default media;
