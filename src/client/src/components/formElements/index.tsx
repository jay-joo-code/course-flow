import moment from 'moment'
import React, { useState, InputHTMLAttributes, forwardRef } from 'react'

import {
  DateRangePicker as DateRangePickerAirbnb, DayPickerSingleDateController, isInclusivelyAfterDay
} from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import theme from 'src/app/theme'
import useIsMobile from 'src/hooks/useIsMobile'
import Icon from '../icon'
import { FlexRow } from '../layout'
import Text from '../text'
import Label from '../text/Label'
import './datepicker.scss'
import {
  CheckboxContainer,
  InputArea,
  InputContainer,
  RadioGroupContainer,
  RadioLabel,
  StyledCheckbox,
  StyledDateRangeWrapper,
  StyledDateWrapper,
  StyledInput,
  StyledSelect, StyledTextArea,
  TextAreaContainer
} from './styles'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  value?: any
  placeholder?: string
  onEnterPress?: () => void
  autoFocus?: boolean
  disabled?: boolean
  width?: number
  fullWidth?: boolean
  error?: boolean | string
  type?: string
}

export const Input = forwardRef((props: InputProps, ref) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && props.onEnterPress) {
      props.onEnterPress()
    }
  }

  return (
    <InputContainer>
      <Label {...props}>{props.label}</Label>
      <InputArea>
        <StyledInput
          onKeyDown={handleKeyDown}
          ref={ref}
          {...props}
        />
      </InputArea>
      {props.error && <Text
        variant='h5'
        color={theme.danger}
      >{props.error}</Text>}
    </InputContainer>
  )
})

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
      <Label
        noMargin={true}
        {...props}
      >
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
  value: any
}

export interface SelectProps {
  options: IOption[]
  value: string
  onChange: React.FormEventHandler<HTMLInputElement>
  label?: string
  disabled?: boolean
  maxMenuHeight?: number

  // react-hook-props
  name: string

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
            primary: theme.brand,
          },
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
            type='radio'
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
  label: string
  startDate: Date | undefined
  endDate: Date | undefined
  setStartDate: (newDate: any) => void
  setEndDate: (newDate: any) => void
}

export const DateRangePicker = ({ label, startDate, endDate, setStartDate, setEndDate }: DateRangePickerProps) => {
  const [previousFocus, setPreviousFocus] = useState<string | null>(null)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  const handleFocusChange = (newFocus) => {
    if (newFocus === 'startDate' && !focusedInput) {
      setFocusedInput('startDate')
    } else if (newFocus === 'endDate' && focusedInput === 'endDate' && previousFocus === 'endDate') {
      setFocusedInput('startDate')
    } else if (!focusedInput && newFocus === 'endDate') {
      setFocusedInput('startDate')
    } else {
      setFocusedInput(newFocus)
    }
    setPreviousFocus(focusedInput)
  }

  const isMobile = useIsMobile()

  const handleDateChange = ({ startDate: startDateAirbnb, endDate: endDateAirbnb }) => {
    if (startDateAirbnb) setStartDate(startDateAirbnb.toDate())
    if (endDateAirbnb) setEndDate(endDateAirbnb.toDate())
  }

  return (
    <StyledDateRangeWrapper>
      <Label>{label}</Label>
      <DateRangePickerAirbnb
        startDate={startDate ? moment(startDate) : null}
        startDateId='start-date-id'
        endDate={endDate ? moment(endDate) : null}
        endDateId='end-date-id'
        onDatesChange={handleDateChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        withPortal={isMobile}
        orientation={isMobile ? 'vertical' : 'horizontal'}
        keepOpenOnDateSelect
        readOnly
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
  step = 1,
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
      fullWidth
    >
      <Text
        variant={isMobile ? 'h4' : 'p'}
        fontWeight={500}
      >
        {label}
      </Text>
      <FlexRow ac>
        <Icon
          variant='remove-circle'
          fill={theme.brand}
          pointer
          size='2rem'
          onClick={handleMinusClick}
        />
        <FlexRow
          jc
          ac
          style={{ width: '40px' }}
        >
          <Text variant='h4'>{value}</Text>
        </FlexRow>
        <Icon
          variant='add-circle'
          fill={theme.brand}
          pointer
          size='2rem'
          onClick={handlePlusClick}
        />
      </FlexRow>
    </FlexRow>
  )
}
