import React, { useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import theme from 'src/app/theme'
import Text from 'src/components/text'
import Span from 'src/components/text/Span'
import { removeRequirement } from 'src/slices/plan'
import styled from 'styled-components'

interface RequirementsListItemProps {
  semesterNumber: number
  row: number
  requirement?: any
  isEndPlaceholder?: boolean
}

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  padding: .5rem;
  margin: 1rem 0;
  cursor: move;
  cursor: grab;
  background: white;
  height: 60px;

  &:hover {
    box-shadow: ${(props) => props.theme.shadow};
  }

  // isDragging
  opacity: ${(props) => (props.isDragging) && 0.6};

  // isPlaceholder
  opacity: ${(props) => props.isPlaceholder && 0};
  background: ${(props) => props.isPlaceholder && 'grey'};
  min-width: ${(props) => props.isPlaceholder && '150px'};
  cursor: ${(props) => props.isPlaceholder && 'unset'};

  // isEndPlaceholder
  min-height: ${(props) => props.isEndPlaceholder && '100px'};

  // isRemoveOnRender
  display: ${(props) => props.isRemoveOnRender && 'none'};
`

const RequirementsListItem = ({ requirement, semesterNumber, row, isEndPlaceholder }: RequirementsListItemProps) => {
  const { _id, label, tag, credits, isPlaceholder, isRemoveOnRender } = requirement || {}
  const dispatch = useDispatch()

  useEffect(() => {
    if (isRemoveOnRender) {
      dispatch(removeRequirement({
        semesterNumber,
        row,
      }))
    }
  }, [isRemoveOnRender])

  const itemId = isEndPlaceholder ? `placeholder-${semesterNumber}-${row}` : _id

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
        // dispatch(moveRequirement({
        //   requirementId: item._id,
        //   destSemesterNumber: semesterNumber,
        //   destRow: row,
        // }))
      }
    },
  })

  const dragProps = (isPlaceholder || isEndPlaceholder)
    ? {}
    : { ref: drag }

  const tagToColor = {
    common: theme.success300,
    core: theme.brandLight,
    elective: theme.info300,
  }

  return (
    <div {...dragProps}>
      <Container
        isDragging={isDragging}
        isPlaceholder={isPlaceholder || isEndPlaceholder}
        isEndPlaceholder={isEndPlaceholder}
        isRemoveOnRender={isRemoveOnRender}
        ref={drop}
      >
        <Text
          variant='h7'
          color={theme.textMuted}
          fontWeight={500}
          uppercase
        >{tag && <Span color={tagToColor[tag]}>{tag}</Span>} {credits && `• ${credits} credits`}</Text>
        <Text
          variant='h5'
          fontWeight={500}
        >{label}</Text>
      </Container>
    </div>
  )
}

export default RequirementsListItem
