import React from 'react'
import { useSelector } from 'react-redux'
import theme from 'src/app/theme'
import Text from 'src/components/text'
import { RootState } from 'src/types'
import styled from 'styled-components'
import RequirementsListItem from './RequirementsListItem'

interface RequirementsListProps {
  semesterNumber: number
}

const Container = styled.div`
  padding: 1rem;
  min-width: 200px;
`

const RequirementsList = ({ semesterNumber }: RequirementsListProps) => {
  const { semesters } = useSelector((state: RootState) => state.planState)
  const heading = semesterNumber === 0
    ? 'Transfer Credits'
    : `Semester ${semesterNumber}`

  return (
    <Container>
      <Text
        variant='h5'
        fontWeight={500}
        color={theme.textLight}
      >{heading}</Text>
      {semesters[semesterNumber].map((requirement, idx) => (
        <RequirementsListItem
          key={requirement?._id}
          requirement={requirement}
          semesterNumber={semesterNumber}
          row={idx}
        />
      ))}
      <RequirementsListItem
        semesterNumber={semesterNumber}
        row={semesters[semesterNumber].length}
        isPlaceholder
      />
    </Container>
  )
}

export default RequirementsList
