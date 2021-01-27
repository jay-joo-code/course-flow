import React from 'react'
import { FlexRow } from 'src/components/layout'
import styled from 'styled-components'
import RequirementsList from './RequirementsList'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Container = styled(FlexRow)`
  overflow: auto;
  padding: 1rem 3rem;
`

const SemesterList = () => {
  const SEMESTER_COUNT = 10

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        {[...Array(SEMESTER_COUNT + 1)].map((_, idx) => (
          <RequirementsList
            key={Math.random()}
            semesterNumber={idx}
          />
        ))}
      </Container>
    </DndProvider>
  )
}

export default SemesterList
