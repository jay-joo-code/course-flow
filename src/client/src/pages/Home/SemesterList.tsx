import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { FlexRow } from 'src/components/layout'
import { dragEnd } from 'src/slices/plan'
import { RootState } from 'src/types/redux'
import RequirementList from './RequirementList'
import styled from 'styled-components'

const WashBackground = styled.div`
  /* background: ${(props) => props.theme.grey[100]}; */
  background: white;
  overflow: auto;
`

const Container = styled(FlexRow)`
  padding: 1rem 2rem;
  align-items: flex-start;
`

const SemesterList = () => {
  const dispatch = useDispatch()
  const { semesters } = useSelector((state: RootState) => state.planState)

  const handleDragEnd = (result) => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    dispatch(dragEnd({
      source,
      destination,
    }))
  }

  return (
    <WashBackground>
      <Container>
        <DragDropContext onDragEnd={handleDragEnd}>
          {semesters.map((semester, semesterNumber) => (
            <Droppable
              key={semesterNumber}
              droppableId={semesterNumber.toString()}
            >
              {(provided, snapshot) => (
                <RequirementList
                  provided={provided}
                  isDraggingOver={snapshot.isDraggingOver}
                  semester={semester}
                  semesterNumber={semesterNumber}
                />
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Container>
    </WashBackground>
  )
}

export default SemesterList
