import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import theme from 'src/app/theme'
import { Button } from 'src/components/buttons'
import { Space } from 'src/components/layout'
import Text from 'src/components/text'
import { RootState } from 'src/types/redux'
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

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  padding: 1rem;
  margin: .5rem 0;
  cursor: move;
  cursor: grab;
  background: white;
  box-shadow: 0;
  transition: box-shadow .2s ease-in-out;

  &:hover {
    box-shadow: ${(props) => props.theme.shadow};
  }

  // isDragging
  border: ${(props) => (props.isDragging) && '2px solid black'};
`

const SideWindowContainer = styled.div`
  position: absolute;
  right: -30px;
  top: 0;
`

const RequirementListItem = ({ provided, draggableStyle, isDragging, requirementId }: RequirementListItemProps) => {
  const { idToRequirement } = useSelector((state: RootState) => state.planState)
  const { credits, label } = idToRequirement[requirementId]
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
        >{credits && `${credits} credits`}</Text>
        <Text
          variant='h5'
          fontWeight={500}
        >{label}</Text>
        <Space margin='1rem 0' />
        <Button
          text
          label='Assign course'
          icon='right'
          isIconRightSide
          iconSize='1.5rem'
          onClick={handleClickOpenAssignWindow}
        />
      </Container>
      <SideWindowContainer>
        <SideWindow
          windowType={windowType}
          setWindowType={setWindowType}
        />
      </SideWindowContainer>
    </RelativeContainer>
  )
}

export default RequirementListItem
