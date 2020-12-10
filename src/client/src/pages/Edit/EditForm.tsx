import React from 'react'
import { useFormik } from 'formik';
import styled from 'styled-components'
import * as Yup from 'yup';
import useCustomMutation from 'src/hooks/useCustomMutation';
import { Button } from 'src/components/buttons';
import { FormikCheckbox, FormikDatePicker, FormikInput, FormikRadioGroup, FormikSelect, FormikTextArea } from 'src/components/formikElements';
import EmbedAutosave from 'src/components/formikElements/EmbedAutosave';
import { showToast } from 'src/util/toast';
import Text from 'src/components/text';
import Property from './Property';
import Dates from './Dates';
import { Space } from 'src/components/layout';

const Form = styled.form`
  & > * {
    margin-bottom: 1rem;
  }

  @media (min-width: ${props => props.theme.medium}) {
    width: 400px;
  }
`;

const EditForm = () => {
  const { mutate } = useCustomMutation({
    url: '',
    method: 'post'
  })

  const formik = useFormik({
    initialValues: {
      // property
      regionCode: null,
      propertyTypeCode: null,
      furnishingCode: null,
      bedroomsTotal: 1,
      bedroomsAvailable: 1,
      bathroomsTotal: 1,

      // dates
      year: null,
      termCode: null,
      startDate: new Date(),
      endDate: new Date(),
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
      {/* <EmbedAutosave
        formik={formik}
        debounceMs={1000}
      /> */}
      <Property formik={formik} />
      <Space margin='3rem 0' />
      <Dates formik={formik} />
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
      <FormikDatePicker
        formik={formik}
        name='datePicker'
      />
      <Button label='submit' type='submit' />
    </Form>
  );
};

export default EditForm
