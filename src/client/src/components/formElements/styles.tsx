import styled, { css } from 'styled-components';
import { hexToAlpha, Transition } from '../globals';
import Textarea from 'react-textarea-autosize';

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.4px;
  color: ${props => props.theme.text.default};
  transition: ${Transition.hover.off};
  position: relative;
  a {
    text-decoration: underline;
  }
  &:hover > input,
  &:hover > textarea {
    border-color: ${props =>
      props.disabled ? props.theme.bg.border : props.theme.text.alt};
    transition: ${Transition.hover.on};
  }
  &:hover > input:focus,
  &:hover > textarea:focus {
    border-color: ${props =>
      props.disabled ? props.theme.bg.inactive : props.theme.brand.alt};
  }
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
    background-color: ${props => props.theme.brand.default};
}

  & > input:checked + span::before,
  & > input:indeterminate + span::before {
    border-color: ${props => props.theme.brand.default};
    background-color: ${props => props.theme.brand.default};
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
    opacity: 0.12;
}

  &:hover > input:focus {
    opacity: 0.16;
}

/* Active */
  & > input:active {
    opacity: 1;
    transform: scale(0);
    transition: transform 0s, opacity 0s;
}

  & > input:active + span::before {
    border-color: ${props => props.theme.brand.default};
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

export const StyledPrefixLabel = styled.label`
  display: flex;
  width: 100%;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.text.placeholder};
  white-space: nowrap;
  text-overflow: ellipsis;
  > input {
    margin-left: 2px;
  }
  &:hover > input {
    border-color: ${props =>
      props.disabled ? props.theme.bg.inactive : props.theme.text.alt};
    transition: ${Transition.hover.on};
  }
`;

export const StyledInput = styled.input`
  flex: 1 0 auto;
  background: ${props =>
    props.disabled ? props.theme.bg.wash : props.theme.bg.default};
  font-weight: 500;
  width: ${props => props.width && `${props.width}px`};
  font-size: 14px;
  border: 2px solid ${props => props.theme.bg.border};
  border-color: ${props => props.error && props.theme.core.danger};
  border-color: ${props => props.disabled && props.theme.bg.inactive};
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 2px;
  box-shadow: none;
  transition: ${Transition.hover.off};
  ${props =>
    props.type === 'checkbox' &&
    css`
      flex: initial;
      width: initial;
      margin-right: 0.5em;
    `} &::placeholder {
    color: ${props => props.theme.text.placeholder};
  }
  &::-webkit-input-placeholder {
    color: ${props => props.theme.text.placeholder};
  }
  &:-moz-placeholder {
    color: ${props => props.theme.text.placeholder};
  }
  &:-ms-input-placeholder {
    color: ${props => props.theme.text.placeholder};
  }
  &:focus {
    border-color: ${props => props.theme.brand.default};
    transition: ${Transition.hover.on};
  }
  &[type='file'] {
    position: absolute;
    left: -9999px;
    top: -9999px;
    visibility: hidden;
  }
`;

export const StyledTextArea = styled(Textarea)`
  flex: 1 0 auto;
  width: 100%;
  background: ${props => props.theme.bg.default};
  font-weight: 500;
  font-size: 14px;
  border: 2px solid ${props => props.theme.bg.inactive};
  border-radius: 4px;
  padding: 12px;
  margin-top: 2px;
  box-shadow: none;
  transition: ${Transition.hover.off};
  &::placeholder {
    color: ${props => props.theme.text.placeholder};
  }
  &::-webkit-input-placeholder {
    color: ${props => props.theme.text.placeholder};
  }
  &:-moz-placeholder {
    color: ${props => props.theme.text.placeholder};
  }
  &:-ms-input-placeholder {
    color: ${props => props.theme.text.placeholder};
  }
  &:focus {
    border-color: ${props => props.theme.brand.default};
    transition: ${Transition.hover.on};
  }
`;

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

export const StyledHiddenInput = styled.input`
  visibility: hidden;
  width: 0;
  height: 0;
`;

export const StyledCheckboxWrapper = styled.div`
  display: flex;
  color: ${props => props.theme.text.alt};
  display: flex;
  align-items: ${props => props.align};
  line-height: 1.4;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    color: ${({ theme, disabled }) =>
      disabled ? theme.text.alt : theme.brand.alt};
  }
  > a {
    text-decoration: none;
    color: ${props => props.theme.brand.alt};
    font-weight: 600;
    border-bottom: 2px solid transparent;
    position: relative;
    padding-bottom: 0px;
    transition: ${Transition.hover.off};
    &:hover {
      border-bottom: 2px solid ${props => props.theme.brand.alt};
      padding-bottom: 2px;
      transition: ${Transition.hover.on};
    }
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