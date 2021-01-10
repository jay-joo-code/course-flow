import React from 'react'
import { Space } from 'src/components/layout'
import Text from 'src/components/text'
import styled from 'styled-components'

interface RentInputGroupProps {
  formik: any;
}

const Container = styled.div``

const RentInputGroup = ({ formik }: RentInputGroupProps) => {
  return (
    <>
      <Text variant="h3">Rent</Text>
      <Space margin="2rem 0" />
    </>
  )
}

export default RentInputGroup
