import React from 'react'
import { Space } from 'src/components/layout'
import Text from 'src/components/text'
import styled from 'styled-components'

interface RoommateInputGroupProps {
  formik: any;
}

const Container = styled.div``

const RoommateInputGroup = ({ formik }: RoommateInputGroupProps) => {
  return (
    <>
      <Text variant="h3">Roommates</Text>
      <Space margin="2rem 0" />
    </>
  )
}

export default RoommateInputGroup
