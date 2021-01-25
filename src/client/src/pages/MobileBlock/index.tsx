import React from 'react'
import Text from 'src/components/text'
import styled from 'styled-components'

const Container = styled.div`
  
`

const MobileBlock = () => {
  return (
    <Container>
      <Text variant='p'>Course Flow is not avaiable on mobile.</Text>
    </Container>
  )
}

export default MobileBlock
