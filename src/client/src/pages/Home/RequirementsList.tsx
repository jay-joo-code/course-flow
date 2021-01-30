import React from 'react'
import { useSelector } from 'react-redux'
import theme from 'src/app/theme'
import Icon from 'src/components/icon'
import { FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import { RootState } from 'src/types'
import { isRequirement } from 'src/types/guards'
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

  let totalCredits = 0
  semesters[semesterNumber]
    .forEach((requirement) => {
      if (isRequirement(requirement)) {
        // @ts-ignore
        totalCredits += requirement?.credits
      }
    })

  return (
    <Container>
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
          >{totalCredits} credits</Text>
        </div>
        <Icon
          variant='more-hori'
          size='1.75rem'
          fill={theme.textMuted}
          interactiveHover
          pointer
        />
      </FlexRow>
      {semesters[semesterNumber].map((requirement, row) => (
        <RequirementsListItem
          key={requirement?._id}
          requirement={requirement}
          semesterNumber={semesterNumber}
          row={row}
        />
      ))}
      <RequirementsListItem
        semesterNumber={semesterNumber}
        row={semesters[semesterNumber].length}
        isEndPlaceholder
      />
    </Container>
  )
}

export default RequirementsList
