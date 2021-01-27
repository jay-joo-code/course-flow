import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import theme from 'src/app/theme'
import Text from 'src/components/text'
import { moveRequirement } from 'src/slices/plan'
import { IRequirement, RequirementDoc } from 'src/types'
import styled from 'styled-components'

interface RequirementsListItemProps {
  semesterNumber: number
  row: number
  requirement?: IRequirement | RequirementDoc | null
  isPlaceholder?: boolean
}

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  padding: .5rem;
  margin: 1rem 0;
  cursor: move;
  cursor: grab;
  background: white;

  // isDragging
  opacity: ${(props) => (props.isDragging) && 0.6};

  // isPlaceholder
  opacity: ${(props) => props.isPlaceholder && 0};
  /* background: ${(props) => props.isPlaceholder && 'grey'}; */
  min-height: ${(props) => props.isPlaceholder && '200px'};
  min-width: ${(props) => props.isPlaceholder && '150px'};
  cursor: ${(props) => props.isPlaceholder && 'unset'};
`

const RequirementsListItem = ({ requirement, semesterNumber, row, isPlaceholder }: RequirementsListItemProps) => {
  const { _id, label, tag, credits } = requirement || {}
  const itemId = isPlaceholder ? `temp-${semesterNumber}` : _id
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag({
    item: { _id: itemId, type: 'requirement' },
    collect: (monitor) => ({
      isDragging: monitor.getItem()?._id === _id,
    }),
  })

  const [_, drop] = useDrop({
    accept: 'requirement',
    hover: (item: any) => {
      if (item._id !== _id) {
        dispatch(moveRequirement({
          requirementId: item._id,
          destSemesterNumber: semesterNumber,
          destRow: row,
        }))
      }
    },
  })

  const dragProps = isPlaceholder
    ? {}
    : { ref: drag }

  return (
    <div {...dragProps}>
      <Container
        isDragging={isDragging}
        isPlaceholder={isPlaceholder}
        ref={drop}
      >
        <Text
          variant='h7'
          color={theme.textMuted}
          fontWeight={500}
          uppercase
        >{tag} {credits && `• ${credits} credits`}</Text>
        <Text
          variant='h5'
          fontWeight={500}
        >{label}</Text>
      </Container>
    </div>
  )
}

export default RequirementsListItem
