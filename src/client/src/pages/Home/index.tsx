import React from 'react'
import styled from 'styled-components'
import InitRequirements from './InitRequirements'
import SemesterList from './SemesterList'

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
