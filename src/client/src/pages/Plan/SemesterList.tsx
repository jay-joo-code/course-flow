import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useUpdatePlanById } from 'src/api/plan'
import { FlexRow } from 'src/components/layout'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import RequirementList from './RequirementList'

interface SemesterListProps {
  semesters: string[][]
}

const WashBackground = styled.div`
  /* background: ${(props) => props.theme.grey[100]}; */
  background: white;
  overflow: auto;
`

const Container = styled(FlexRow)`
  padding: 1rem 2rem;
  align-items: flex-start;
`

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const moveBetweenLists = (source: string[], destination: string[], droppableSource: any, droppableDestination: any) => {
  const sourceClone = [...source]
  const destClone = [...destination]
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

const SemesterList = ({ semesters }: SemesterListProps) => {
  const { match } = useRouter()
  const { updatePlan } = useUpdatePlanById(match.params.psid)

  const handleDragEnd = (result) => {
    const { source, destination } = result

    if (!destination) {
      // dropped outside the list
      return
    }

    const sourceSemesterNumber = +source.droppableId
    const destSemesterNumber = +destination.droppableId
    const newSemesters = [...semesters]

    if (sourceSemesterNumber === destSemesterNumber) {
      // movement within the same list
      newSemesters[sourceSemesterNumber] = reorder(newSemesters[sourceSemesterNumber], source.index, destination.index)
    } else {
      // movement between different lists
      const result = moveBetweenLists(newSemesters[sourceSemesterNumber], newSemesters[destSemesterNumber], source, destination)
      newSemesters[sourceSemesterNumber] = result[sourceSemesterNumber]
      newSemesters[destSemesterNumber] = result[destSemesterNumber]
    }

    updatePlan({
      semesters: newSemesters,
    })
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
