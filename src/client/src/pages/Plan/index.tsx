import React from 'react'
import styled from 'styled-components'
import SemesterList from './SemesterList'

const Container = styled.div`
  display: flex;
  overflow: hidden;
`

const Plan = () => {
  // currently it's semesters data at the index component
  // propagating down to all the child components
  // this means when there is a change to the semesters position,
  // all semesters rerender, leading to performance issues
  // semester data (requirement id list) should be accessed independently by each RequirementList

  return (
    <Container>
      <SemesterList />
    </Container>
  )
}

export default Plan
