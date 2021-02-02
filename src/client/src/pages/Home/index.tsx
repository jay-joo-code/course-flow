import React from 'react'
import styled from 'styled-components'
import SemesterList from './SemesterList'
import InitRequirements from './InitRequirements'

const Container = styled.div`
  display: flex;
  overflow: hidden;
`

const Home = () => {
  return (
    <Container>
      <InitRequirements />
      <SemesterList />
    </Container>
  )
}

export default Home
