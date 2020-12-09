import React from 'react'
import { useFormik } from 'formik';
import styled from 'styled-components'
import * as Yup from 'yup';
import useCustomMutation from 'src/hooks/useCustomMutation';
import { Button } from 'src/components/buttons';
import { FormikCheckbox, FormikDatePicker, FormikInput, FormikRadioGroup, FormikSelect, FormikTextArea } from 'src/components/formikElements';
import EmbedAutosave from 'src/components/formikElements/EmbedAutosave';
import { showToast } from 'src/util/toast';

const Form = styled.form`

  & > * {
    margin-bottom: 1rem;
  }
`;

const EditForm = () => {
  const { mutate } = useCustomMutation({
    url: '',
    method: 'post'
  })

  const radioGroupOptions = [
    {
      label: 'radio option A',
      value: '1',
    },
  ]

  const selectOptions = [
    {
      label: 'select option A',
      value: '1'
    },
  ]

  const formik = useFormik({
    initialValues: {
      input: 'init value',
      textarea: 'textarea init value',
      checkbox: true,
      radioGroup: '1',
      select: '1',
      datePicker: new Date(),
    },
    validationSchema: Yup.object({
      input: Yup.string()
        .required('Required'),
    }),
    onSubmit: async (values) => {
      showToast('success', 'submitted', { toastId: 'submitted' })
      await mutate(values)
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <EmbedAutosave 
        formik={formik}
        debounceMs={1000}
      />
      <FormikInput
        formik={formik}
        name='input'
        label='test input'
        placeholder='input placeholder'
      />
      <FormikTextArea
        formik={formik}
        name='textarea'
        label='test textarea'
        placeholder='textarea placeholder'
        minRows={3}
        maxRows={5}
      />
      <FormikCheckbox
        formik={formik}
        name='checkbox'
        label='test checkbox'
      />
      <FormikRadioGroup
        formik={formik}
        name='radioGroup'
        options={radioGroupOptions}
      />
      <FormikSelect
        formik={formik}
        name='select'
        options={selectOptions}
        label='formik select'
      />
      <FormikDatePicker
        formik={formik}
        name='datePicker'
      />
      <Button label='submit' type='submit' />
    </Form>
  );
};

export default EditForm
