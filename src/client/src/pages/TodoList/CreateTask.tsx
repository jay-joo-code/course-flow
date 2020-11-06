import React from 'react'
import { Button } from 'src/components/buttons'
import styled from 'styled-components'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'src/components/formElements';
import { FormikInput } from 'src/components/formikElements';
import { Label } from 'src/components/globals';
import useCustomMutation from 'src/hooks/useCustomMutation';
import { ITask } from 'src/types';
import { IQueryConfig } from 'src/hooks/useCustomQuery';

const Container = styled.div`
  width: 400px;
  padding: 1rem;
`

interface CreateTaskProps {
  queryConfig: IQueryConfig
}

const CreateTask = ({ queryConfig }) => {
  const { isLoading, mutate } = useCustomMutation<ITask>({
    url: '/task',
    method: 'post',
    updateLocal: {
      queryConfig,
      type: 'create',
    }
  })

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
        await mutate(values as any)
        resetForm()
      } catch (e) {
      }
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput
          formik={formik}
          name='name'
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
