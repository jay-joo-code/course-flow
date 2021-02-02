import React from 'react'
import OutsideClickListener from 'src/components/layout/OutsideClickListener'
import styled from 'styled-components'

interface SideWindowProps {
  windowType: string | null
  setWindowType: (value: string | null) => void
}

const Container = styled.div`
  height: 60px;
  width: 60px;
  background: grey;
`

const SideWindow = ({ windowType, setWindowType }: SideWindowProps) => {
  if (!windowType) return null

  return (
    <OutsideClickListener onOutsideClick={() => setWindowType(null)}>
      <Container >

      </Container>
    </OutsideClickListener>
  )
}

export default SideWindow
