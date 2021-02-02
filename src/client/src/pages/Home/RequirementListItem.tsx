import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import theme from 'src/app/theme'
import { Button } from 'src/components/buttons'
import Icon from 'src/components/icon'
import { FlexColumn, FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import { RootState } from 'src/types/redux'
import { courseName, requirementCredits } from 'src/util/roster'
import styled from 'styled-components'
import SideWindow from './SideWindow'

interface RequirementListItemProps {
  provided: any
  draggableStyle: any
  isDragging: boolean
  requirementId: string
  row: number
  semesterNumber: number
}
const RelativeContainer = styled.div`
  position: relative;
`

const Container = styled(FlexColumn)`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  padding: 1rem 1rem .5rem 1rem;
  margin: .5rem 0;
  cursor: move;
  cursor: grab;
  background: white;
  box-shadow: 0;
  transition: box-shadow .2s ease-in-out;
  align-items: flex-start;

  &:hover {
    box-shadow: ${(props) => props.theme.shadow};
  }

  // isDragging
  border: ${(props) => (props.isDragging) && `2px solid ${props.theme.grey[600]}`};
`

const SideWindowContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  right: -245px;

  // isAssigned
  right: ${(props) => props.isAssigned && '-305px'};
`

const AssignButton = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.brand};
  padding: .4rem .2rem;
  padding: ${(props) => props.isAssigned ? '.4rem .2rem' : '.6rem .2rem'};
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: ${(props) => props.isAssigned ? props.theme.grey[200] : props.theme.brandBg};
  }
`

const CourseName = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${(props) => props.theme.textLight};
  line-height: 1.5;
`

const RequirementListItem = ({ provided, draggableStyle, isDragging, requirementId }: RequirementListItemProps) => {
  const { idToRequirement } = useSelector((state: RootState) => state.planState)
  const requirement = idToRequirement[requirementId]
  const { credits, label, assignedCourse, assignedCourseId } = requirement
  const [windowType, setWindowType] = useState<string | null>(null)

  const handleClickOpenAssignWindow = () => {
    setWindowType('assign')
  }

  return (
    <RelativeContainer>
      <Container
        style={draggableStyle}
        isDragging={isDragging}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Text
          variant='h7'
          color={theme.textMuted}
          fontWeight={500}
          uppercase
        >{credits && `${requirementCredits(requirement)} credits`}</Text>
        <div onClick={() => console.log('click label')}>
          <Text
            variant='h5'
            fontWeight={500}
          >{label}</Text>
        </div>
        <Space margin={assignedCourseId ? '.5rem 0' : '.8rem 0'} />
        {assignedCourseId
          ? (
            <AssignButton
              onClick={handleClickOpenAssignWindow}
              isAssigned
            >
              <FlexRow ac>
                <CourseName>{courseName(assignedCourse)}</CourseName>
                <Icon
                  variant='right'
                  size='1.3rem'
                  fill={theme.textLight}
                />
              </FlexRow>
            </AssignButton>
            )
          : (
          <AssignButton onClick={handleClickOpenAssignWindow}>Assign course</AssignButton>
            )}
      </Container>
      <SideWindowContainer isAssigned={assignedCourseId}>
        <SideWindow
          windowType={windowType}
          setWindowType={setWindowType}
          requirementId={requirementId}
        />
      </SideWindowContainer>
    </RelativeContainer>
  )
}

export default RequirementListItem
