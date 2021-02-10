import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import theme from 'src/app/theme'
import { Button } from 'src/components/buttons'
import { FlexColumn, FlexRow, Space } from 'src/components/layout'
import Text from 'src/components/text'
import Span from 'src/components/text/Span'
import { courseName } from 'src/util/roster'
import styled from 'styled-components'

interface CourseInfoProps {
  requirementId: string
  assignedCourse: any
}

const Container = styled(FlexColumn)`
  width: 260px;
  align-items: flex-start;
`

const Description = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  // isExpanded
  display: ${(props) => props.isExpanded && 'unset'};
`

const ReadMoreButton = styled.button`
  font-size: .9rem;
  color: ${(props) => props.theme.brand};
  font-weight: 500;
  background: white;
  display: inline-block;
  cursor: pointer;
  padding: 0;
`

const CourseInfo = ({ requirementId, assignedCourse }: CourseInfoProps) => {
  const { titleShort, catalogWhenOffered, catalogPrereqCoreq, description, subject, catalogNbr } = assignedCourse
  const [isExpanded, setIsExpanded] = useState(false)
  const dispatch = useDispatch()

  const handleUnassign = () => {
    // TODO:
  }

  return (
    <Container>
      <Text
        variant='h4'
        fontWeight={500}
      >{courseName(assignedCourse)}</Text>
      <Text
        variant='h6'
        fontWeight={400}
        color={theme.textMuted}
      >{titleShort}</Text>
      <Space margin='.3rem 0' />
      <Text variant='h6'>
        <a
          href={`https://classes.cornell.edu/browse/roster/SP20/class/${subject}/${catalogNbr}`}
          target='_blank'
          rel='noreferrer'
        >
          <Span
            underline
            color={theme.info}
          >Roster</Span>
        </a> •
        <a
          href={`https://www.google.com/search?q=cornell+reddit+${subject}+${catalogNbr}`}
          target='_blank'
          rel='noreferrer'
        >
          <Span
            underline
            color={theme.info}
          > Reddit</Span>
        </a> •
        <a
          href={`https://www.cureviews.org/course/${subject}/${catalogNbr}`}
          target='_blank'
          rel='noreferrer'
        >
          <Span
            underline
            color={theme.info}
          > Reviews</Span>
        </a>
      </Text>
      <Space margin='.5rem 0' />
      {catalogWhenOffered && (
        <>
          <Text
            variant='h5'
            fontWeight={500}
          >When offered</Text>
          <Text variant='h5'>{catalogWhenOffered}</Text>
          <Space margin='.5rem 0' />
        </>
      )}
      <Text
        variant='h5'
        fontWeight={500}
      >Prerequisites / Corequisites</Text>
      <Text variant='h5'>{catalogPrereqCoreq || 'None'}</Text>
      {description && (
        <>
          <Space margin='.5rem 0' />
          <Text
            variant='h5'
            fontWeight={500}
          >Description</Text>
          <Description
            variant='h5'
            isExpanded={isExpanded}
          >{description}</Description>
          <Space margin='.2rem 0' />
          <ReadMoreButton onClick={() => setIsExpanded(!isExpanded)}>Read {isExpanded ? 'less' : 'more'}</ReadMoreButton>
        </>
      )}
      <Space margin='1.5rem 0' />
      <FlexRow
        je
        fullWidth
      >
        <Button
          label='unassign'
          onClick={handleUnassign}
          text

        />
      </FlexRow>
    </Container>
  )
}

export default CourseInfo
