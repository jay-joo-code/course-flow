import React from 'react';

// TODO: use the same logic for Select, Textarea, Datepicker
import { Input, InputProps } from 'src/components/formElements';
import { StyledField, FieldError } from './styles';

interface FormikFieldProps extends InputProps {
  formik: any
  name: string
  automargin?: boolean
}

const generateField = (FormComponent) => {
  const FieldComponent = ({ formik, name, automargin, ...rest }: FormikFieldProps) => {
    const error = formik.errors[name]

    return (
      <StyledField
        automargin={automargin}
      >
        <FormComponent
          error={error}
          name={name}
          {...formik.getFieldProps(name)}
          {...rest}
        />
        {error && <FieldError>{error}</FieldError>}
      </StyledField>
    );
  };

  return FieldComponent;
};

export const FormikInput = generateField(Input)
