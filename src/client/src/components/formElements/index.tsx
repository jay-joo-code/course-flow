import React from 'react';
import Icon from '../icon';
import styled from 'styled-components'

import {
  StyledLabel,
  StyledPrefixLabel,
  StyledInput,
  StyledTextArea,
  StyledUnderlineInput,
  StyledHiddenInput,
  StyledCheckboxWrapper,
  StyledError,
  StyledSuccess,
  PhotoInputLabel,
  CoverInputLabel,
  InputOverlay,
  CoverImage,
  PhotoInputImage,
} from './styles';

export interface InputProps {
  children?: React.ReactNode
  inputType?: string
  defaultValue?: string
  value?: any
  placeholder?: string
  onChange?: React.FormEventHandler<HTMLInputElement>
  onBlur?: React.FormEventHandler<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  autoFocus?: boolean
  disabled?: boolean
  id?: string
  size?: number
  width?: number
  error?: boolean
  name?: string
};

export const Input = (props: InputProps) => {
  const propsWithoutChildren = {
    ...props,
    children: undefined,
  }

  return (
    <StyledLabel {...props}>
      {props.children}
      <StyledInput
        {...propsWithoutChildren}
      />
    </StyledLabel>
  );
};

const CheckboxContainer = styled.div`
  position: relative;
  text-align: left;

  & label {
    cursor: pointer;
    display: inline;
    line-height: 1.25rem;
    vertical-align: top;
    clear: both;
    padding-left: 1px;
    &:not(:empty) {
      padding-left: .75rem;
    }

    &:before, &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
    }

    &:before {
      // box
      width: 1.25rem;
      height: 1.25rem;
      background: #fff;
      border: 2px solid ${props => props.theme.bg.border};
      border-radius: .125rem;
      cursor: pointer;
      transition: background .3s;

      // box (checked)
      background: ${props => props.checked && props.theme.brand.default};
      border: ${props => props.checked && 'none'};
    }

    &:after {
      // checkmark
      transform: translate(.25rem, .25rem) rotate(-45deg);
      width: .7rem;
      height: .3rem;

      border: 0.125rem solid white;
      border-top-style: none;
      border-right-style: none;

      display: ${props => props.checked ? 'block' : 'none'};
    }
  }

  input[type="checkbox"] {
    outline: 0;
    visibility: hidden;
    width: 1.25rem;
    margin: 0;
    display: block;
    float: left;
    font-size: inherit;
    
    &:disabled {
      + label:before{
        border-color: ${props => props.theme.bg.border};
      }
      &:checked {
        + label:before{
          background: ${props => props.theme.bg.border};
        }
      }
    }
  }
 
}
`;

export interface CheckboxProps extends InputProps {
  checked?: boolean
  onClick?: () => void
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <CheckboxContainer
      checked={props.checked}
      onClick={props.onClick}
    >
      <input
        type='checkbox'
        checked={props.checked}
      />
      <label />
      {props.children}
    </CheckboxContainer>
  );
};

/*
type PhotoInputProps = {
  size?: number,
  type: 'user' | 'community',
  defaultValue: any,
  onChange: React.FormEventHandler<HTMLInputElement>,
  dataCy?: string,
};

export const PhotoInput = (props: PhotoInputProps) => {
  const { size = 48, type, defaultValue, onChange, dataCy } = props;

  let visible = defaultValue;
  let src = defaultValue;

  if (!src || src.length === 0) {
    visible = true;
    src =
      type === 'user'
        ? '/img/default_avatar.svg'
        : '/img/default_community.svg';
  }

  return (
    <PhotoInputLabel type={type} size={size}>
      <InputOverlay type={type} size={size} visible={visible}>
        <Icon glyph="photo" />
      </InputOverlay>

      <PhotoInputImage
        type={type}
        alt={'Profile photo'}
        src={src}
        size={size}
      />

      <StyledHiddenInput
        type="file"
        id="file"
        name="file"
        accept={'.png, .jpg, .jpeg'}
        multiple={false}
        onChange={onChange}
        data-cy={dataCy}
      />
    </PhotoInputLabel>
  );
};

type CoverPhotoInputProps = {
  defaultValue: string,
  onChange: Function,
  dataCy?: string,
};

export const CoverInput = (props: CoverPhotoInputProps) => {
  return (
    <CoverInputLabel>
      <InputOverlay
        visible={!props.defaultValue || props.defaultValue.length === 1}
      >
        <WhiteOutlineButton as={'div'}>Add Cover Photo</WhiteOutlineButton>
      </InputOverlay>
      <CoverImage
        src={props.defaultValue ? `${props.defaultValue}` : ''}
        role="presentation"
      />
      <StyledHiddenInput
        type="file"
        id="file"
        name="file"
        accept={
          props.allowGif ? '.png, .jpg, .jpeg, .gif, .mp4' : '.png, .jpg, .jpeg'
        }
        multiple={false}
        onChange={props.onChange}
        data-cy={props.dataCy}
      />
    </CoverInputLabel>
  );
};


export const TextArea = (props: InputProps) => {
  return (
    <StyledLabel>
      {props.children}
      <StyledTextArea
        id={props.id}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        data-cy={props.dataCy}
      />
    </StyledLabel>
  );
};

export class UnderlineInput extends React.Component<InputProps> {
  render() {
    return (
      <StyledPrefixLabel disabled={this.props.disabled}>
        {this.props.children}
        <StyledUnderlineInput
          type="text"
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.props.value || this.props.defaultValue}
          onChange={this.props.onChange}
          autoFocus={this.props.autoFocus}
          disabled={this.props.disabled}
          data-cy={this.props.dataCy}
        />
      </StyledPrefixLabel>
    );
  }
}

export const Error = (props: Object) => {
  const { children, ...rest } = props;
  return <StyledError {...rest}>{children}</StyledError>;
};

export const Success = (props: Object) => {
  const { children, ...rest } = props;
  return <StyledSuccess {...rest}>{children}</StyledSuccess>;
};

*/