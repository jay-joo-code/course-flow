import React from 'react';
import {
  StyledInput,
  InputContainer,
  StyledCheckbox,
  CheckboxContainer,
  StyledTextArea,
  TextAreaContainer,
  StyledSelect,
  RadioLabel,
  RadioGroupContainer,
  StyledDateWrapper,
} from './styles';
import theme from 'src/app/theme';
import { isInclusivelyAfterDay, DayPickerSingleDateController } from 'react-dates'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import Label from '../text/Label';

export interface InputProps {
  label?: string
  value?: any
  placeholder?: string
  onChange?: React.FormEventHandler<HTMLInputElement>
  onBlur?: React.FormEventHandler<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  autoFocus?: boolean
  disabled?: boolean
  width?: number
  error?: boolean
  type?: string
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
  checked: boolean
  onChange: React.FormEventHandler<HTMLInputElement>
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

export interface TextAreaProps extends InputProps {
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

export interface IOption {
  label: string
  value: string
}

export interface SelectProps  {
  options: IOption[]
  value: string
  onChange: React.FormEventHandler<HTMLInputElement>
  label?: string
  disabled?: boolean
  maxMenuHeight?: number
}

export const Select = (props: SelectProps) => {
  const valueObject = props.options.find((option) => option.value === props.value)
  return (
    <div>
      <Label {...props}>{props.label}</Label>
      <StyledSelect
        isDisabled={props.disabled}
        theme={defaultStyles => ({
          ...defaultStyles,
          colors: {
            ...defaultStyles.colors,
            primary25: theme.brandLight,
            primary50: theme.bgWash2,
            primary: theme.brand,
          },
        })}
        {...props}
        value={valueObject}
        key={`select-key-${JSON.stringify(valueObject)}`}
      />
    </div>
  );
};

interface RadioGroupProps extends InputProps {
  value: any
  setValue: (newValue: string) => void
  options: IOption[]
}

export const RadioGroup = (props: RadioGroupProps) => {
  const handleRadioClick = (e, value) => {
    if (e.target.checked) {
      if (value === props.value) {
        // already checked, uncheck
        props.setValue('')
      } else {
        // check
        props.setValue(value)
      }
    }
  }

  return (
    <RadioGroupContainer>
      {props.options.map(({ value, label }) => (
        <RadioLabel key={value}>
          <input
            type='radio'
            value={value}
            checked={props.value === value}
            onClick={(e) => handleRadioClick(e, value)}
          />
          <span>{label}</span>
        </RadioLabel>
      ))}
    </RadioGroupContainer>
  );
};

export interface DatePickerProps {
  date: Date | undefined
  setDate: (newDate: any) => void
}

export const DatePicker = (props: DatePickerProps) => {
  const handleDateChange = (newDate) => {
    props.setDate(newDate.toDate())
  }

  return (
    <StyledDateWrapper>
      <DayPickerSingleDateController
        {...props}
        onDateChange={handleDateChange}
        focused={true}
        date={props.date && moment(props.date)}
        hideKeyboardShortcutsPanel
        isOutsideRange={day => !isInclusivelyAfterDay(day, moment())}
      />
    </StyledDateWrapper>
  );
};
