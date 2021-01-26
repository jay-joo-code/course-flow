import React from 'react'
import { FlexRow } from 'src/components/layout'
import styled from 'styled-components'
import RequirementsList from './RequirementsList'

const Container = styled(FlexRow)`
  overflow: auto;
  padding: 1rem 3rem;
`

const SemesterList = () => {
  const SEMESTER_COUNT = 10

  return (
    <Container>
      {[...Array(SEMESTER_COUNT + 1)].map((_, idx) => idx !== 0 && (
        <RequirementsList
          key={Math.random()}
          number={idx}
        />
      ))}
    </Container>
  )
}

export default SemesterList
