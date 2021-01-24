import React, { memo, useMemo } from 'react'

import theme from 'src/app/theme'
import { FormikInput } from 'src/components/formikElements'
import { FlexColumn, Space } from 'src/components/layout'
import Text from 'src/components/text'

interface RentInputGroupProps {
  formik: any;
}

const RentInputGroup = ({ formik, }: RentInputGroupProps) => {
  return (
    <FlexColumn>
      <Text variant="h3">Rent</Text>
      <Space margin="1rem 0" />
      <FormikInput
        formik={formik}
        name='rent'
        label='Rent'
      />
      <Space margin='.8rem 0' />
      <FormikInput
        formik={formik}
        name='deposit'
        label='Deposit'
      />
      <Space margin='.2rem 0' />
      <Text
        variant='h5'
        color={theme.textLight}
      >
        It is recommended to set a security deposit of at least one month’s rent.
      </Text>
    </FlexColumn>
  )
}

export default RentInputGroup
