import theme from 'src/app/theme'
import styled from 'styled-components'

export const Label = styled.label`
  font-weight: 500;
  font-size: .9rem;
  letter-spacing: -0.4px;
  margin-bottom: .4rem;
  color: ${props => props.theme.text};
  display: block;

  // disabled
  color: ${props => props.disabled && props.theme.textLight};

  // noMargin
  margin-bottom: ${props => props.noMargin && '0'};
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

export const P = styled(CoreText)`
  font-size: 1rem;
  line-height: 1.4;
`;

export const H5 = styled(CoreText)`
  font-size: 0.875rem;
  line-height: 1.4;
`;

export const H6 = styled(CoreText)`
  text-transform: uppercase;
  font-size: 0.75rem;
  line-height: 1.5;
`;