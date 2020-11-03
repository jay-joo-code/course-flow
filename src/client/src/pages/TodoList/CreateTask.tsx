import React from 'react'
import { Button } from 'src/components/buttons'
import useApi from 'src/hooks/useApi'
import styled from 'styled-components'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'src/components/formElements';
import { FormikInput } from 'src/components/formikElements';
import { Label } from 'src/components/globals';

const Container = styled.div`
  width: 400px;
  padding: 1rem;
`

interface CreateTaskProps {
  fetchTasks: () => void
}

const CreateTask = ({ fetchTasks }: CreateTaskProps) => {
  const [{ data, isLoading }, createTask] = useApi.post('/task')

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await createTask({ ...values })
        await fetchTasks()
        resetForm()
      } catch (e) {
        // TODO: render toast
      }
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput
          formik={formik}
          name='name'
          automargin
          label='task name'
        />
        <Button
          label='submit'
          type='submit'
          isLoading={isLoading}
        />
      </form>
    </Container>
  )
}

export default CreateTask
