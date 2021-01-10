import React, { useState } from 'react'
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
  StyledDateRangeWrapper
} from './styles'
import theme from 'src/app/theme'
import {
  isInclusivelyAfterDay,
  DayPickerSingleDateController,
  DateRangePicker as DateRangePickerAirbnb
} from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import Label from '../text/Label'
import { FlexRow, Space } from '../layout'
import Text from '../text'
import Icon from '../icon'
import useIsMobile from 'src/hooks/useIsMobile'

export interface InputProps {
  label?: string
  value?: any
  placeholder?: string
  onChange?: React.FormEventHandler<HTMLInputElement>
  onBlur?:
    | React.FormEventHandler<HTMLInputElement>
    | React.ChangeEvent<HTMLInputElement>
  onEnterPress?: () => void
  autoFocus?: boolean
  disabled?: boolean
  width?: number
  error?: boolean
  type?: string
}

export const Input = (props: InputProps) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && props.onEnterPress) {
      props.onEnterPress()
    }
  }

  return (
    <InputContainer>
      <Label {...props}>{props.label}</Label>
      <StyledInput
        onKeyDown={handleKeyDown}
        {...props} />
    </InputContainer>
  )
}

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
          type="checkbox"
          onChange={props.onChange}
          checked={props.checked}
        />
        <span />
      </StyledCheckbox>
      <Label
        noMargin={true}
        {...props}>
        {props.label}
      </Label>
    </CheckboxContainer>
  )
}

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
  )
}

export interface IOption {
  label: string
  value: string
}

export interface SelectProps {
  options: IOption[]
  value: string
  onChange: React.FormEventHandler<HTMLInputElement>
  label?: string
  disabled?: boolean
  maxMenuHeight?: number
}

export const Select = (props: SelectProps) => {
  const valueObject = props.options.find(
    (option) => option.value === props.value
  )
  return (
    <div>
      <Label {...props}>{props.label}</Label>
      <StyledSelect
        isDisabled={props.disabled}
        theme={(defaultStyles) => ({
          ...defaultStyles,
          colors: {
            ...defaultStyles.colors,
            primary25: theme.brandLight,
            primary50: theme.bgWash2,
            primary: theme.brand
          }
        })}
        {...props}
        value={valueObject}
        key={`select-key-${JSON.stringify(valueObject)}`}
        isSearchable={false}
      />
    </div>
  )
}

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
            type="radio"
            value={value}
            checked={props.value === value}
            onClick={(e) => handleRadioClick(e, value)}
          />
          <span>{label}</span>
        </RadioLabel>
      ))}
    </RadioGroupContainer>
  )
}

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
        hideKeyboardShortcutsPanel={true}
        isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
      />
    </StyledDateWrapper>
  )
}

export interface DateRangePickerProps {
  startDate: Date | undefined
  endDate: Date | undefined
  setStartDate: (newDate: any) => void
  setEndDate: (newDate: any) => void
}

export const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }: DateRangePickerProps) => {
  const [focusedInput, setFocusedInput] = useState(null)
  const handleDateChange = ({ startDate: startDateAirbnb, endDate: endDateAirbnb }) => {
    setStartDate(startDateAirbnb.toDate())
    setEndDate(endDateAirbnb.toDate())
  }

  return (
    <StyledDateRangeWrapper>
      <DateRangePickerAirbnb
        startDate={null} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={null} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={handleDateChange} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
        readOnly={true}
      />
    </StyledDateRangeWrapper>
  )
}

interface IncrementorProps {
  value: number
  label: string
  onChange: (newValue: number) => void
  minValue?: number
  maxValue?: number
  step?: number
}

export const Incrementor = ({
  value,
  label,
  onChange,
  minValue,
  maxValue,
  step = 1
}: IncrementorProps) => {
  const isMobile = useIsMobile()
  const handleMinusClick = () => {
    const newValue = value - step
    if (minValue !== undefined) {
      onChange(Math.max(minValue, newValue))
    } else {
      onChange(newValue)
    }
  }

  const handlePlusClick = () => {
    const newValue = value + step
    if (maxValue !== undefined) {
      onChange(Math.min(maxValue, newValue))
    } else {
      onChange(newValue)
    }
  }

  return (
    <FlexRow
      ac
      jsb
      fullWidth>
      <Text
        variant={isMobile ? 'h4' : 'p'}
        fontWeight={500}>
        {label}
      </Text>
      <FlexRow ac>
        <Icon
          variant="remove-circle"
          fill={theme.brand}
          pointer
          size="2rem"
          onClick={handleMinusClick}
        />
        <FlexRow
          jc
          ac
          style={{ width: '40px' }}>
          <Text variant="h4">{value}</Text>
        </FlexRow>
        <Icon
          variant="add-circle"
          fill={theme.brand}
          pointer
          size="2rem"
          onClick={handlePlusClick}
        />
      </FlexRow>
    </FlexRow>
  )
}
