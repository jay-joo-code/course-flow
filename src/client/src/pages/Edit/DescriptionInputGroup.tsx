import React from 'react'
import { FormikTextArea } from 'src/components/formikElements'
import { FlexColumn, Space } from 'src/components/layout'
import Text from 'src/components/text'
import styled from 'styled-components'
import theme from 'src/app/theme'

interface DescriptionInputGroupProps {
  formik: any;
}

const Container = styled.div``

const DescriptionInputGroup = ({ formik }: DescriptionInputGroupProps) => {
  return (
    <FlexColumn>
      <Text variant="h3">Description</Text>
      <Space margin=".2rem 0" />
      <Text
        variant="h5"
        color={theme.textLight}>
        Is there anything else about the sublet that you wish to talk about?
      </Text>
      <Space margin=".5rem 0" />
      <FormikTextArea
        formik={formik}
        name="description"
        minRows={12}
        maxRows={16}
      />
    </FlexColumn>
  )
}

export default DescriptionInputGroup
