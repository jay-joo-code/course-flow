import React from 'react'
import theme from 'src/app/theme'
import Text from 'src/components/text'
import { IRequirement, RequirementDoc } from 'src/types'
import styled from 'styled-components'

interface RequirementsListItemProps {
  requirement: IRequirement | RequirementDoc | null
}

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  padding: .5rem;
  margin: .5rem 0;
`

const RequirementsListItem = ({ requirement }: RequirementsListItemProps) => {
  const { label, tag, credits } = requirement || {}

  return (
    <Container>
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
  )
}

export default RequirementsListItem
