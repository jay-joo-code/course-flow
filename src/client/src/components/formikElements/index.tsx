import React from 'react';
import { Checkbox, CheckboxProps, Input, InputProps, TextAreaProps, RadioGroup, IOption, SelectProps, TextArea, Select, DatePicker } from 'src/components/formElements';
import { Margin } from '../layout';
import styled from 'styled-components'
import Text from '../text';

const FullWidth = styled.div`
  width: 100%;
`;

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
      <Margin margin='.2rem 0' />
      {error && <Text variant='h5' color='danger'>{error}</Text>}
    </FullWidth>
  );
};

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
      <Margin margin='.2rem 0' />
      {error && <Text variant='h5' color='danger'>{error}</Text>}
    </FullWidth>
  );
};

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
      <Margin margin='.2rem 0' />
      {error && <Text variant='h5' color='danger'>{error}</Text>}
    </FullWidth>
  );
};

interface FormikRadioGroupProps {
  formik: any
  name: string
  options: IOption[]
}

export const FormikRadioGroup = ({ formik, name, options, ...rest }: FormikRadioGroupProps) => {
  const hasError = formik.touched[name] && formik.errors[name]
  const error = hasError ? formik.errors[name] : ''

  const handleSetValue = (newValue) => {
    formik.setFieldValue(name, newValue)
  }

  return (
    <FullWidth>
      <RadioGroup
        options={options}
        value={formik.values[name]}
        setValue={handleSetValue}
        {...rest}
      />
      <Margin margin='.2rem 0' />
      {error && <Text variant='h5' color='danger'>{error}</Text>}
    </FullWidth>
  );
};

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
      <Margin margin='.2rem 0' />
      {error && <Text variant='h5' color='danger'>{error}</Text>}
    </FullWidth>
  );
};

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
      <Margin margin='.2rem 0' />
      {error && <Text variant='h5' color='danger'>{error}</Text>}
    </FullWidth>
  );
};
