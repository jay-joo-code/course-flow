import React from 'react'
import { useDispatch } from 'react-redux'
import Text from 'src/components/text'
import styled from 'styled-components'
import theme from 'src/app/theme'

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
    // TODO: handle assign on click
  }

  return (
    <Container onClick={handleClick}>
      <Text
        variant='h5'
        fontWeight={400}
        color={theme.textLight}
      >{courseData.subject} {courseData.catalogNbr}</Text>
    </Container>
  )
}

export default DropdownItem