import React from 'react'
import styled from 'styled-components'

interface PillProps {
  label: string
  onClick?: () => void
}

const Container = styled.div`
  border-radius: 20px;
  padding: .3rem .5rem;
  background: ${(props) => props.theme.brand300};
  color: white;
  font-size: .7rem;
`

const Pill = ({ label, onClick }: PillProps) => {
  return (
    <Container onClick={onClick}>
      {label}
    </Container>
  )
}

export default Pill
