import React from 'react'
import { FormikSelect } from 'src/components/formikElements'
import { Space } from 'src/components/layout'
import Text from 'src/components/text'
import styled from 'styled-components'

interface DatesProps {
  formik: any
}

const Dates = ({ formik }: DatesProps) => {
  const yearOptions = [
    {
      label: '2021',
      value: '2021',
    },
    {
      label: '2022',
      value: '2022',
    },
    {
      label: '2023',
      value: '2023',
    },
    {
      label: '2024',
      value: '2024',
    },
  ]

  const termOptions = [
    {
      label: 'Winter (Jan - Feb)',
      value: '1',
    },
    {
      label: 'Spring (Feb - May)',
      value: '2',
    },
    {
      label: 'Summer (May - Aug)',
      value: '3',
    },
    {
      label: 'Fall (Aug - Dec)',
      value: '4',
    },
  ]
  return (
    <>
      <Text variant='h3'>Dates</Text>
      <Space margin='2rem 0' />
      <FormikSelect
        formik={formik}
        name='year'
        options={yearOptions}
        label='Year'
      />
      <FormikSelect
        formik={formik}
        name='termCode'
        options={termOptions}
        label='Term'
      />
    </>
  )
}

export default Dates
