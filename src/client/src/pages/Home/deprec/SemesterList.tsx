import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FlexRow } from 'src/components/layout'
import styled from 'styled-components'
import RequirementsList from './RequirementsList'

const WashBackground = styled.div`
  background: ${(props) => props.theme.bgWash1};
  overflow: auto;
`

const Container = styled(FlexRow)`
  padding: 1rem 2rem;
  height: 100%;
`

const SemesterList = () => {
  const SEMESTER_COUNT = 10

  return (
    <WashBackground>
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
    </WashBackground>
  )
}

export default SemesterList
