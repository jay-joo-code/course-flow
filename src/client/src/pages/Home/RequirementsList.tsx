import React from 'react'
import { useSelector } from 'react-redux'
import Text from 'src/components/text'
import { RootState } from 'src/types'
import styled from 'styled-components'
import RequirementsListItem from './RequirementsListItem'

interface RequirementsListProps {
  number: number
}

const Container = styled.div`
  padding: 1rem;
  min-width: 200px;
`

const RequirementsList = ({ number }: RequirementsListProps) => {
  const { semesters } = useSelector((state: RootState) => state.planState)

  return (
    <Container>
      <Text variant='h5'>Semester {number}</Text>
      {semesters[number].map((requirement) => (
        <RequirementsListItem
          key={Math.random()}
          requirement={requirement}
        />
      ))}
    </Container>
  )
}

export default RequirementsList
