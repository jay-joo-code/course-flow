import React from 'react'
import { useFormik } from 'formik';
import styled from 'styled-components'
import * as Yup from 'yup';
import useCustomMutation from 'src/hooks/useCustomMutation';
import { Button } from 'src/components/buttons';
import { FormikCheckbox, FormikDatePicker, FormikInput, FormikRadioGroup, FormikSelect, FormikTextArea } from 'src/components/formikElements';
import { setAuthToken } from 'src/util/authToken';

const Form = styled.form`
  width: 400px;

  & > * {
    margin-bottom: 1rem;
  }
`;

const Login = () => {
  const { mutate } = useCustomMutation({
    url: '/public/auth/login',
    method: 'post'
  })

  const formik = useFormik({
    initialValues: {
      email: 'tester1@gmail.com',
      password: 'test123',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const authRes: any = await mutate(values)
      const { token } = authRes
      setAuthToken(token)
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormikInput
        formik={formik}
        name='email'
        label='Email'
      />
      <FormikInput
        formik={formik}
        name='password'
        label='Password'
        type='password'
      />
      <Button label='Login' type='submit' />
    </Form>
  );
};

export default Login
