import React from 'react';
import {
  StyledInput,
  InputContainer,
  StyledCheckbox,
  CheckboxContainer,
  StyledTextArea,
  TextAreaContainer,
  StyledSelect,
} from './styles';
import { H4, Label } from '../globals';
import theme from 'src/app/theme';

export interface InputProps {
  label: string
  value?: any
  placeholder?: string
  onChange?: React.FormEventHandler<HTMLInputElement>
  onBlur?: React.FormEventHandler<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  autoFocus?: boolean
  disabled?: boolean
  size?: number
  width?: number
  error?: boolean
};

export const Input = (props: InputProps) => {
  return (
    <InputContainer>
      <Label {...props}>{props.label}</Label>
      <StyledInput {...props} />
    </InputContainer>
  );
};

export interface CheckboxProps {
  label: string
  checked?: boolean
  onChange?: React.FormEventHandler<HTMLInputElement>
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <StyledCheckbox>
        <input
          type='checkbox'
          onChange={props.onChange}
          checked={props.checked}
        />
        <span />
      </StyledCheckbox>
      <Label noMargin {...props}>{props.label}</Label>
    </CheckboxContainer>
  );
};

interface TextAreaProps extends InputProps {
  maxRows?: number
  minRows?: number
}

export const TextArea = (props: TextAreaProps) => {
  return (
    <TextAreaContainer>
      <Label {...props}>{props.label}</Label>
      <div>
        <StyledTextArea {...props} />
      </div>
    </TextAreaContainer>
  );
};

interface Option {
  label: string
  value: string
}

interface SelectProps extends InputProps {
  options: Option[]
}

export const Select = (props: SelectProps) => {
  return (
    <TextAreaContainer>
      <Label {...props}>{props.label}</Label>
      <StyledSelect
        {...props}
        theme={defaultStyles => ({
          ...defaultStyles,
          colors: {
            ...defaultStyles.colors,
            primary25: theme.brandLight,
            primary50: theme.bgWash,
            primary: theme.brand,
          },
        })}
      />
    </TextAreaContainer>
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