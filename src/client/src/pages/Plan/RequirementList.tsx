import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import theme from 'src/app/theme'
import { FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import { ISemester } from 'src/types/requirement'
import styled from 'styled-components'
import RequirementListItem from './RequirementListItem'

interface RequirementListProps {
  provided: any
  isDraggingOver: boolean
  semester: ISemester
  semesterNumber: number
}

const Container = styled.div`
  padding: 1rem;
  margin: 0 .5rem;
  min-width: 240px;
  background: ${(props) => props.theme.grey[100]};
  border-radius: 8px;

  // isDraggingOver
  background: ${(props) => props.isDraggingOver && props.theme.brandBg};
`

const RequirementList = ({ provided, isDraggingOver, semester, semesterNumber }: RequirementListProps) => {
  // const { idToRequirement } = useSelector((state: RootState) => state.planState)

  const heading = semesterNumber === 0
    ? 'Transfer Credits'
    : `Semester ${semesterNumber}`

  const totalCredits = 0
  semester
    .forEach((requirementId: string) => {
      // totalCredits += requirementCredits(idToRequirement[requirementId])
    })

  return (
    <Container
      ref={provided.innerRef}
      {...provided.droppableProps}
      isDraggingOver={isDraggingOver}
    >
      <FlexRow
        jsb
        alignStart
      >
        <div>
          <Space margin='.2rem 0' />
          <Text
            variant='h5'
            fontWeight={500}
            color={theme.textLight}
          >{heading}</Text>
          <Text
            variant='h6'
            color={theme.textMuted}
            fontWeight={400}
          >{totalCredits} credits</Text>
        </div>
        {/* <Icon
          variant='more-hori'
          size='1.75rem'
          fill={theme.textMuted}
          interactiveHover
          pointer
        /> */}
      </FlexRow>
      <Space margin='1rem 0' />
      {semester.map((requirementId, row) => (
        <Draggable
          key={requirementId}
          draggableId={requirementId}
          index={row}
        >
          {(provided, snapshot) => (
            <RequirementListItem
              provided={provided}
              draggableStyle={provided.draggableProps.style}
              isDragging={snapshot.isDragging}
              requirementId={requirementId}
              row={row}
              semesterNumber={semesterNumber}
            />
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </Container>
  )
}

export default RequirementList
