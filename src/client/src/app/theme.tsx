import palette from "src/util/palette";

export const theme = {
  ...palette,
  
  // feedback
  success: '#66c088',
  info: '#0275d8',
  warning: '#f0ad4e',
  danger: '#de6362',

  // bg
  bg: '#FFFFFF',
  bgWash1: palette.grey[50],
  bgWash2: palette.grey[200],

  // border
  border: '#D8D8D9',
  borderLight: '#E2E2E3',
  borderDark: '#C6C6C7',

  // brand
  brand: '#5B2D95',
  brandLight: '#C8B9DC',
  brandDark: '#1E0F32',
  brandBg: '#FAFAFA',

  // accent
  accent: '#f5414f',
  accentLight: '#FCC0C4',
  accentDark: '#A32B35',
  accentBg: '#FEE7E9',

  // text
  text: '#24292E',
  textLight: '#575859',
  textMuted: '#737576',
  textPlaceholder: '#D3D7DB',

  // shadow
  shadow: '0 2px 4px rgba(0, 0, 0, .2)',

  // social
  facebook:'#3B5998',
  twitter:'#00ACED',
  google:'#ea4335',
  github:'#16171A',

  // breakpoints
  small: '576px',   // landscape phones
  medium: '768px',  // tablets
  large: '992px',   // desktops, laptops
};

export default theme;
