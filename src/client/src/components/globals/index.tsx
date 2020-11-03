import theme from 'src/app/theme'
import styled, { css } from 'styled-components';

export const Gradient = (g1, g2) =>
  css`radial-gradient(ellipse farthest-corner at top left, ${g1} 0%, ${g2} 100%)`;

export const tint = (hex: string, amount: number) => {
  let R = parseInt(hex.substring(1, 3), 16);
  let G = parseInt(hex.substring(3, 5), 16);
  let B = parseInt(hex.substring(5, 7), 16);

  const getSingle = (val: number): number => parseInt(((val * (100 + amount)) / 100).toString(), 10);

  R = getSingle(R);
  G = getSingle(G);
  B = getSingle(B);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const getDouble = (val: number) =>
    val.toString(16).length === 1
      ? `0${val.toString(16)}`
      : val.toString(16);

  const RR = getDouble(R);
  const GG = getDouble(G);
  const BB = getDouble(B);

  return `#${RR}${GG}${BB}`;
};

export const hexToAlpha = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  if (alpha >= 0) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

export const Shadow = {
  low: '0 2px 4px rgba(0, 0, 0, .2)',
  mid: '0 4px 12px',
  high: '0 8px 16px',
};

export const Transition = {
  hover: {
    on: 'all 0.2s ease-in',
    off: 'all 0.2s ease-out',
  },
  reaction: {
    on: 'all 0.15s ease-in',
    off: 'all 0.1s ease-out',
  },
  dropdown: {
    off: 'all 0.35s ease-out',
  },
};

export const Margin = styled.div`
  margin: ${props => props.margin && props.margin};
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: -0.4px;
  color: ${theme.text};
  &:not(:first-of-type) {
    margin-top: 1.5rem;
  }
  a {
    text-decoration: underline;
  }
`;

export const PrefixLabel = styled.label`
  display: flex;
  width: 100%;
  margin-top: 0.25rem;
  padding-left: 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.textPlaceholder};
  > input {
    margin-left: 2px;
  }
`;

const CoreText = styled.p`
  color: ${theme.text};
  white-space: pre-line;
  word-break: break-word;
  font-weight: 300;

  // ellipsis
  text-overflow: ${(props) => (props.ellipsis ? 'ellipsis' : '')};
  overflow: ${(props) => (props.ellipsis ? 'hidden' : '')};
  white-space: ${(props) => (props.ellipsis ? 'nowrap' : '')};

  // nowrap
  white-space: ${(props) => (props.nowrap ? 'nowrap' : '')};

  // muted
  opacity: ${(props) => (props.muted ? '.8' : '')};

  // color
  color: ${(props) => (props.color ? props.theme[props.color] : '')};

  // bold
  font-weight: ${(props) => (props.bold ? 'bold' : '')};

  // lighter
  font-weight: ${props => props.lighter && 'lighter'};

  // maxWidth
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '')};

  // margin
  margin: ${props => props.margin ? props.margin : ''};
`;

export const H1 = styled(CoreText)`
  font-size: 3rem;
  line-height: 1.3;
`;

export const H2 = styled(CoreText)`
  font-size: 2.25rem;
  line-height: 1.3;
`;

export const H3 = styled(CoreText)`
  font-size: 1.875rem;
  line-height: 1.5;
`;

export const H4 = styled(CoreText)`
  font-size: 1.25rem;
  line-height: 1.4;
`;

export const H5 = styled(CoreText)`
  font-size: 1.15rem;
  line-height: 1.4;
`;

export const H6 = styled(CoreText)`
  text-transform: uppercase;
  font-size: 0.75rem;
  line-height: 1.5;
`;

export const P = styled(CoreText)`
  font-size: 1rem;
  line-height: 1.4;
`;

export const Meta = styled(CoreText)`
  font-size: 0.875rem;
  line-height: 1.4;
`;

export const Span = styled.span`
  color: ${theme.text};
  font-size: 0.875rem;
  line-height: 1.4;
`;