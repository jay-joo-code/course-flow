import React from 'react'
import { useDispatch } from 'react-redux'
import Text from 'src/components/text'
import styled from 'styled-components'
import { assignCourse } from 'src/slices/plan'

interface DropdownItemProps {
  courseData: any
  requirementId: string
}

const Container = styled.div`
  padding: .5rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.brandBg};
  }
`

const DropdownItem = ({ courseData, requirementId }: DropdownItemProps) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(assignCourse({
      requirementId,
      courseData,
    }))
  }

  return (
    <Container onClick={handleClick}>
      <Text
        variant='h5'
      >{courseData.subject} {courseData.catalogNbr}</Text>
    </Container>
  )
}

export default DropdownItem
