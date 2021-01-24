import React from 'react'
import theme from 'src/app/theme'
import { Checkbox, DatePicker, DateRangePicker, Incrementor, Input, InputProps, IOption, RadioGroup, Select, TextArea, TextAreaProps } from 'src/components/formElements'
import styled from 'styled-components'
import { Space } from '../layout'
import Text from '../text'

const FullWidth = styled.div`
  width: 100%;
`

interface FormikInputProps extends InputProps {
  formik: any
  name: string
}

export const FormikInput = ({ formik, name, ...rest }: FormikInputProps) => {
  const hasError = formik.touched[name] && formik.errors[name]
  const error = hasError ? formik.errors[name] : ''

  return (
    <FullWidth>
      <Input
        error={error}
        name={name}
        {...formik.getFieldProps(name)}
        {...rest}
      />
      <Space margin='.2rem 0' />
      {error && <Text
        variant='h5'
        fontWeight={500}
        color={theme.danger}
      >
        {error}
      </Text>
      }
    </FullWidth>
  )
}

interface FormikTextAreaProps extends TextAreaProps {
  formik: any
  name: string
}

export const FormikTextArea = ({ formik, name, ...rest }: FormikTextAreaProps) => {
  const hasError = formik.touched[name] && formik.errors[name]
  const error = hasError ? formik.errors[name] : ''

  return (
    <FullWidth>
      <TextArea
        error={error}
        name={name}
        {...formik.getFieldProps(name)}
        {...rest}
      />
      <Space margin='.2rem 0' />
      {error && <Text
        variant='h5'
        fontWeight={500}
        color={theme.danger}
      >{error}
                </Text>}
    </FullWidth>
  )
}

interface FormikCheckboxProps {
  formik: any
  name: string
  label: string
}

export const FormikCheckbox = ({ formik, name, ...rest }: FormikCheckboxProps) => {
  const hasError = formik.touched[name] && formik.errors[name]
  const error = hasError ? formik.errors[name] : ''

  const handleChange = (e) => {
    formik.setFieldValue(name, e.target.checked)
  }

  return (
    <FullWidth>
      <Checkbox
        {...rest}
        checked={formik.values[name]}
        onChange={handleChange}
      />
      <Space margin='.2rem 0' />
      {error && <Text
        variant='h5'
        fontWeight={500}
        color={theme.danger}
      >{error}
                </Text>}
    </FullWidth>
  )
}

interface IFormikRadioGroupOption {
  label: string
  value: string | number | boolean
}

interface FormikRadioGroupProps {
  formik: any
  name: string
  options: IFormikRadioGroupOption[]
  convertValueToString?: boolean
}

export const FormikRadioGroup = ({ formik, name, options, convertValueToString, ...rest }: FormikRadioGroupProps) => {
  const hasError = formik.touched[name] && formik.errors[name]
  const error = hasError ? formik.errors[name] : ''
  const booleanToString = (bool: boolean) => {
    return bool === true
      ? 'true'
      : bool === false
        ? 'false'
        : null
  }
  const stringToBoolean = (str: string) => {
    return str === 'true'
      ? true
      : str === 'false'
        ? false
        : null
  }
  const convertedValue = !convertValueToString
    ? formik.values[name]
    : booleanToString(formik.values[name])
  const convertedOptions:IOption[] = !convertValueToString
    ? [...options]
    : options.map((option) => ({ ...option, value: option.value ? 'true' : 'false' }))

  const handleSetValue = (newValue) => {
    if (convertValueToString) {
      formik.setFieldValue(name, stringToBoolean(newValue))
    } else {
      formik.setFieldValue(name, newValue)
    }
  }

  return (
    <FullWidth>
      <RadioGroup
        options={convertedOptions}
        value={convertedValue}
        setValue={handleSetValue}
        {...rest}
      />
      <Space margin='.2rem 0' />
      {error && <Text
        variant='h5'
        fontWeight={500}
        color={theme.danger}
      >{error}
                </Text>}
    </FullWidth>
  )
}

interface FormikSelectProps {
  formik: any
  name: string
  options: IOption[]
  label?: string
  disabled?: boolean
  maxMenuHeight?: number
}

export const FormikSelect = ({ formik, name, ...rest }: FormikSelectProps) => {
  const hasError = formik.touched[name] && formik.errors[name]
  const error = hasError ? formik.errors[name] : ''

  const handleChange = (newOption) => {
    formik.setFieldValue(name, newOption.value)
  }

  return (
    <FullWidth>
      <Select
        {...rest}
        value={formik.values[name]}
        onChange={handleChange}
      />
      <Space margin='.2rem 0' />
      {error && <Text
        variant='h5'
        fontWeight={500}
        color={theme.danger}
      >{error}</Text>}
    </FullWidth>
  )
}

interface FormikDatePickerProps {
  formik: any
  name: string
}

export const FormikDatePicker = ({ formik, name, ...rest }: FormikDatePickerProps) => {
  const hasError = formik.touched[name] && formik.errors[name]
  const error = hasError ? formik.errors[name] : ''

  const handleSetDate = (date) => {
    formik.setFieldValue(name, date)
  }

  return (
    <FullWidth>
      <DatePicker
        date={formik.values[name]}
        setDate={handleSetDate}
      />
      <Space margin='.2rem 0' />
      {error && <Text
        variant='h5'
        fontWeight={500}
        color={theme.danger}
      >{error}
                </Text>}
    </FullWidth>
  )
}

interface FormikDateRangePickerProps {
  formik: any
  startDateName: string
  endDateName: string
  label: string
}

export const FormikDateRangePicker = ({ formik, startDateName, endDateName, label, ...rest }: FormikDateRangePickerProps) => {
  const hasError = formik.touched[startDateName] && formik.errors[startDateName] && formik.touched[endDateName] && formik.errors[endDateName]
  const error = hasError ? (formik.errors[startDateName] || formik.errors[endDateName]) : ''

  const handleSetStartDate = (date) => {
    formik.setFieldValue(startDateName, date)
  }

  const handleSetEndDate = (date) => {
    formik.setFieldValue(endDateName, date)
  }

  return (
    <FullWidth>
      <DateRangePicker
        label={label}
        startDate={formik.values[startDateName]}
        endDate={formik.values[endDateName]}
        setStartDate={handleSetStartDate}
        setEndDate={handleSetEndDate}
      />
      <Space margin='.2rem 0' />
      {error && <Text
        variant='h5'
        fontWeight={500}
        color={theme.danger}
      >{error}
                </Text>}
    </FullWidth>
  )
}

interface FormikIncrementorProps {
  formik: any
  name: string
  label: string
  minValue?: number
  maxValue?: number
  step?: number
}

export const FormikIncrementor = ({ formik, name, ...rest }: FormikIncrementorProps) => {
  const hasError = formik.touched[name] && formik.errors[name]
  const error = hasError ? formik.errors[name] : ''

  const handleChange = (newValue) => {
    formik.setFieldValue(name, newValue)
  }

  return (
    <FullWidth>
      <Incrementor
        value={formik.values[name]}
        onChange={handleChange}
        {...rest}
      />
      <Space margin='.2rem 0' />
      {error && <Text
        variant='h5'
        fontWeight={500}
        color={theme.danger}
      >{error}
                </Text>}
    </FullWidth>
  )
}
