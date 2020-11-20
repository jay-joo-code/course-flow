import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import ReactSelect from 'react-select'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledCheckbox = styled.label`
  z-index: 0;
  position: relative;
  display: inline-block;
  color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
  font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
  font-size: 16px;
  line-height: 1.5;

  & > input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    z-index: -1;
    position: absolute;
    left: -10px;
    top: -8px;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    box-shadow: none;
    outline: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s, transform 0.2s;
}

/* Span */
  & > span {
    display: flex;
    width: 100%;
    cursor: pointer;
}

/* Box */
  & > span::before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    margin: 3px 11px 3px 1px;
    border: solid 2px; /* Safari */
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    border-radius: 2px;
    width: 18px;
    height: 18px;
    vertical-align: top;
    transition: border-color 0.2s, background-color 0.2s;
    flex-shrink: 0;
}

/* Checkmark */
  & > span::after {
    content: "";
    display: block;
    position: absolute;
    top: 3px;
    left: 1px;
    width: 10px;
    height: 5px;
    border: solid 2px transparent;
    border-right: none;
    border-top: none;
    transform: translate(3px, 4px) rotate(-45deg);
}

/* Checked, Indeterminate */
  & > input:checked,
  & > input:indeterminate {
    background-color: ${props => props.theme.brand};
}

  & > input:checked + span::before,
  & > input:indeterminate + span::before {
    border-color: ${props => props.theme.brand};
    background-color: ${props => props.theme.brand};
}

  & > input:checked + span::after,
  & > input:indeterminate + span::after {
    border-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
}

  & > input:indeterminate + span::after {
    border-left: none;
    transform: translate(4px, 3px);
}

/* Hover, Focus */
  &:hover > input {
    opacity: 0.04;
}

  & > input:focus {
    opacity: 0;
}

  &:hover > input:focus {
    opacity: 0.12;
}

/* Active */
  & > input:active {
    opacity: 1;
    transform: scale(0);
    transition: transform 0s, opacity 0s;
}

  & > input:active + span::before {
    border-color: ${props => props.theme.brand};
}

  & > input:checked:active + span::before {
    border-color: transparent;
    background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
}

/* Disabled */
  & > input:disabled {
    opacity: 0;
}

  & > input:disabled + span {
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
    cursor: initial;
}

  & > input:disabled + span::before {
    border-color: currentColor;
}

  & > input:checked:disabled + span::before,
  & > input:indeterminate:disabled + span::before {
    border-color: transparent;
    background-color: currentColor;
}

`;

export const StyledInput = styled.input`
  flex: 1 0 auto;
  background: ${props => props.theme.bg};
  font-weight: 500;
  font-size: .9rem;
  border: 2px solid ${props => props.theme.borderDark};
  border-radius: 4px;
  padding: 8px 12px;
  transition: border .1s ease-in-out;

  // disabled
  background: ${props => props.disabled && props.theme.bgWash};

  // width
  width: ${props => props.width && `${props.width}px`};

  // error
  border-color: ${props => props.error && props.theme.danger};

  &:focus {
    border-color: ${props => props.theme.brand};
  }

  &::placeholder {
    color: ${props => props.theme.textPlaceholder};
  }
`;

export const TextAreaContainer = styled.div`

`;

export const StyledTextArea = styled(Textarea)`
  width: 100%;
  background: ${props => props.theme.bg};
  font-size: .9rem;
  font-family: inherit;
  border: 2px solid ${props => props.theme.borderDark};
  border-radius: 4px;
  line-height: 1.5;
  padding: .5rem;
  overflow-y: auto;
  transition: border .1s ease-in-out;

  // disabled
  background: ${props => props.disabled && props.theme.bgWash};

  &::placeholder {
    color: ${props => props.theme.textPlaceholder};
  }
  &:focus {
    border-color: ${props => props.theme.brand};
  }
`;

export const StyledSelect = styled(ReactSelect)`
  & * {
    cursor: pointer !important;
    line-height: 1.5 !important;
  }

  & .css-1okebmr-indicatorSeparator {
    display: none;
  }
`;

export const RadioGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RadioLabel = styled.label`
  z-index: 0;
  position: relative;
  display: inline-block;
  color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
  font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
  font-size: 16px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  margin: .2rem 0;

  /* Input */
  & > input {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      z-index: -1;
      position: absolute;
      left: -10px;
      top: -8px;
      display: block;
      margin: 0;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
      outline: none;
      opacity: 0;
      transform: scale(1);
      pointer-events: none;
      transition: opacity 0.3s, transform 0.2s;
  }

  /* Span */
  & > span {
      display: inline-block;
      width: 100%;
      cursor: pointer;
  }

  /* Circle */
  & > span::before {
      content: "";
      display: inline-block;
      box-sizing: border-box;
      margin: 2px 10px 2px 0;
      border: solid 2px; /* Safari */
      border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
      border-radius: 50%;
      width: 20px;
      height: 20px;
      vertical-align: top;
      transition: border-color 0.2s;
  }

  /* Check */
  & > span::after {
      content: "";
      display: block;
      position: absolute;
      top: 2px;
      left: 0;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      background-color: ${props => props.theme.brand};
      transform: translate(5px, 5px) scale(0);
      transition: transform 0.2s;
  }

  /* Checked */
  & > input:checked {
      background-color: ${props => props.theme.brand};
  }

  & > input:checked + span::before {
      border-color: ${props => props.theme.brand};
  }

  & > input:checked + span::after {
      transform: translate(5px, 5px) scale(1);
  }

  /* Hover, Focus */
  &:hover > input {
      opacity: 0.04;
  }

  & > input:focus {
      /* opacity: 0.12; */
  }

  &:hover > input:focus {
      opacity: 0.1;
  }

  /* Active */
  & > input:active {
      opacity: 1;
      transform: scale(0);
      transition: transform 0s, opacity 0s;
  }

  & > input:active + span::before {
      border-color: ${props => props.theme.brand};
  }

  /* Disabled */
  & > input:disabled {
      opacity: 0;
  }

  & > input:disabled + span {
      color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
      cursor: initial;
  }

  & > input:disabled + span::before {
      border-color: currentColor;
  }

  & > input:disabled + span::after {
      background-color: currentColor;
  }
`;

export const StyledDateWrapper = styled.div`
  & .CalendarMonth_caption {
    padding-bottom: 50px !important;
  }

  & .CalendarMonth_table {
    td {
      vertical-align: middle;
    }
  }

  & .CalendarDay__selected {
    background: ${props => props.theme.brand};
    border-color: ${props => props.theme.brand};
  }
`;

/*
export const StyledUnderlineInput = styled.input`
  font-size: inherit;
  font-weight: inherit;
  color: ${props =>
    props.disabled ? props.theme.text.alt : props.theme.text.default};
  border-bottom: ${props =>
    props.disabled
      ? '2px solid transparent'
      : `2px solid ${props.theme.bg.inactive}`};
  width: 50%;
  transition: ${Transition.hover.off};
  &:hover {
    border-color: ${props => (props.disabled ? 'transparent' : 'inherit')};
    transition: ${Transition.hover.on};
  }
  &:focus {
    border-color: ${props => props.theme.brand.default};
    transition: ${Transition.hover.on};
  }
`;

export const StyledError = styled.p`
  font-size: 14px;
  color: ${props => props.theme.warn.default};
  padding: 8px 0 16px;
  line-height: 1.4;
  font-weight: 600;
  a {
    text-decoration: underline;
  }
`;

export const StyledSuccess = styled.p`
  font-size: 14px;
  color: ${props => props.theme.success.default};
  padding: 8px 0 16px;
  line-height: 1.4;
  font-weight: 600;
`;

export const PhotoInputLabel = styled.label`
  position: relative;
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  border-radius: ${props =>
    props.type === 'user' ? `${props.size}px` : '8px'};
  margin-top: 8px;
  background-color: ${props => props.theme.bg.reverse};
`;

export const PhotoInputImage = styled.img`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: ${props =>
    props.type === 'user' ? `${props.size}px` : '8px'};
  box-shadow: 0 0 0 2px ${props => props.theme.bg.default};
`;

export const CoverInputLabel = styled.label`
  position: relative;
  height: 114px;
  max-width: 342px;
  width: 100%;
  margin-top: 8px;
  border-radius: 8px;
  background-color: ${props => props.theme.bg.reverse};
`;

export const ProfileImage = styled.img`
  position: absolute;
  object-fit: cover;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${props =>
    props.type === 'user' ? `${props.size}px` : '8px'};
  border: 2px solid ${props => props.theme.text.reverse};
`;

export const CoverImage = styled.div`
  background-color: ${props => props.theme.brand.default};
  background-image: url('${props => props.src}');
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 114px;
  border-radius: 8px;
`;

export const InputOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${props => props.theme.text.reverse};
  background-color: ${({ theme }) => hexToAlpha(theme.bg.reverse, 0.6)};
  padding: 8px;
  border-radius: ${props =>
    props.type === 'user' ? `${props.size}px` : '8px'};
  opacity: ${props => (props.visible ? '1' : '0')};
  transition: ${Transition.hover.off};
  &:hover {
    opacity: 1;
    transition: ${Transition.hover.on};
    + img,
    + div {
      transition: ${Transition.hover.on};
      opacity: 0.25;
    }
  }
  &:hover div {
    transition: ${Transition.hover.on};
  }
`;

*/
