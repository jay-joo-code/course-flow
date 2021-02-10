import React from 'react'
import OutsideClickListener from 'src/components/layout/OutsideClickListener'
import styled from 'styled-components'
import AssignSideWindow from './AssignSideWindow'

interface SideWindowProps {
  windowType: string | null
  setWindowType: (value: string | null) => void
  requirementId: string
}

const Container = styled.div`
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow};
  background: white;
`

const SideWindow = ({ requirementId, windowType, setWindowType }: SideWindowProps) => {
  if (!windowType) return null

  const typeToComponent = {
    assign: <AssignSideWindow requirementId={requirementId} />,
  }

  return (
    <OutsideClickListener onOutsideClick={() => setWindowType(null)}>
      <Container >
        {typeToComponent[windowType]}
      </Container>
    </OutsideClickListener>
  )
}

export default SideWindow
