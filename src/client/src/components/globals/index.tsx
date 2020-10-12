import theme from 'src/app/theme'
import styled, { css, keyframes } from 'styled-components';

export const Gradient = (g1, g2) =>
  css`radial-gradient(ellipse farthest-corner at top left, ${g1} 0%, ${g2} 100%)`;

export const Truncate = () => css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`;

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

export const hexa = (hex, alpha) => {
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
  low: '0 2px 8px',
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

// z-index computations

const base = 1; // z-index: auto content will go here or inherit z-index from a parent

const background = base - 1; // content that should always be behind other things (e.g. textures/illos)
const hidden = base - 2; // content should be hidden completely (USE ADD'L MEANS OF HIDING)

const card = base + 1; // all cards should default to one layer above the base content
const loading = card + 1; // loading elements should never appear behind cards
const avatar = card + 1; // avatars should never appear behind cards
const form = card + 1; // form elements should never appear behind cards
const search = form; // search is a type of form and should appear at the same level
const dmInput = form;

const composerToolbar = 2000; // composer toolbar - should sit in between most elements

const chrome = 3000; // chrome should be visible in modal contexts
const navBar = chrome; // navBar is chrome and should appear at the same level
const mobileInput = chrome + 1; // the chatInput on mobile should appear above the navBar
const dropDown = chrome + 1; // dropDowns shouldn't appear behind the navBar

const slider = window.innerWidth < 768 ? chrome + 1 : chrome; // slider should appear significantly above the base to leave room for other elements
const composer = 4000; // should cover all screen except toasts
const chatInput = slider + 1; // the slider chatInput should always appear above the slider
const flyout = chatInput + 3; // flyout may overlap with chatInput and should take precedence

const fullscreen = 4000; // fullscreen elements should cover all screen content except toasts

const modal = 5000; // modals should completely cover base content and slider as well
const gallery = modal + 1; // gallery should never appear behind a modal

const toast = 6000; // toasts should be visible in every context
const tooltip = toast + 1; // tooltips should always be on top

export const zIndex = {
  base,
  background,
  hidden,
  card,
  loading,
  avatar,
  form,
  search,
  dmInput,
  composerToolbar,
  chrome,
  navBar,
  mobileInput,
  dropDown,
  slider,
  composer,
  chatInput,
  flyout,
  fullscreen,
  modal,
  gallery,
  toast,
  tooltip,
};

const spin = keyframes`
  to {transform: rotate(360deg);}
`;

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
  color: ${theme.text.default};
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
  color: ${theme.text.placeholder};
  > input {
    margin-left: 2px;
  }
`;

/*
export const Input = styled.input`
  flex: 1 0 auto;
  background: ${theme.bg.default};
  font-weight: 500;
  width: 100%;
  font-size: 0.875rem;
  border: 0.125rem solid ${theme.bg.inactive};
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  margin-top: 0.125rem;
  box-shadow: none;
  ${props =>
    props.type === 'checkbox' &&
    css`
      flex: initial;
      width: initial;
      margin-right: 0.5rem;
    `} &::placeholder {
    color: ${theme.text.placeholder};
  }
  &::-webkit-input-placeholder {
    color: ${theme.text.placeholder};
  }
  &:-moz-placeholder {
    color: ${theme.text.placeholder};
  }
  &:-ms-input-placeholder {
    color: ${theme.text.placeholder};
  }
  &:focus {
    border-color: ${theme.brand.default};
  }
`;

export const TextArea = styled.textarea`
  flex: 1 0 auto;
  width: 100%;
  background: ${theme.bg.default};
  font-weight: 500;
  font-size: 0.875rem;
  border: 0.125rem solid ${theme.bg.inactive};
  border-radius: 0.25rem;
  padding: 0.75rem;
  margin-top: 0.125rem;
  box-shadow: none;
  &::placeholder {
    color: ${theme.text.placeholder};
  }
  &::-webkit-input-placeholder {
    color: ${theme.text.placeholder};
  }
  &:-moz-placeholder {
    color: ${theme.text.placeholder};
  }
  &:-ms-input-placeholder {
    color: ${theme.text.placeholder};
  }
  &:focus {
    border-color: ${theme.brand.default};
  }
`;

export const UnderlineInput = styled.input`
  font-size: inherit;
  font-weight: inherit;
  color: ${theme.text.default};
  border-bottom: 0.125rem solid ${theme.bg.inactive};
  &:focus {
    border-color: ${theme.brand.default};
  }
`;
*/

export const H1 = styled.h1`
  color: ${theme.text.default};
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.3;
  margin: 0;
  padding: 0;
`;

export const H2 = styled.h2`
  color: ${theme.text.default};
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.3;
  margin: 0;
  padding: 0;
`;

export const H3 = styled.h3`
  color: ${theme.text.default};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
`;

export const H4 = styled.h4`
  color: ${theme.text.default};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`;

export const H5 = styled.h5`
  color: ${theme.text.default};
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`;

export const H6 = styled.h6`
  color: ${theme.text.default};
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.675rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
`;

export const P = styled.p`
  color: ${theme.text.default};
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`;

export const Span = styled.span`
  color: ${theme.text.default};
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

export const Onboarding = props => css`
  position: relative;
  &:after,
  &:before {
    line-height: 1;
    user-select: none;
    pointer-events: none;
    position: absolute;
    opacity: 0;
    display: block;
  }
  &:before {
    content: '';
    z-index: ${zIndex.tooltip + 1};
    border: 5px solid transparent;
  }
  &:after {
    content: ${props.onboarding ? `'${props.onboarding}'` : "''"};
    z-index: ${zIndex.tooltip};
    text-align: left;
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    width: 300px;
    white-space: normal;
    overflow: hidden;
    padding: 16px;
    padding-left: 20px;
    border-radius: 12px;
    background-color: ${props.theme.bg.default};
    background: ${props.theme.bg.default} url(/img/goopy-top.svg) center top
      no-repeat;
    background-size: 100%;
    color: ${props.theme.text.default};
    box-shadow: 0 8px 32px rgba(23, 26, 33, 0.35);
  }
  &:after,
  &:before {
    opacity: 1;
    transition: opacity 0.1s ease-in 0.1s;
  }
`;

export const HorizontalRule = styled(FlexRow)`
  position: relative;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  color: ${theme.bg.border};
  hr {
    display: inline-block;
    flex: 1 0 auto;
    border-top: 1px solid ${theme.bg.border};
  }
  div {
    margin: 0 16px;
  }
`;