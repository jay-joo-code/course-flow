import React from 'react'
import styled from 'styled-components'

interface PillProps {
  label: string
  onClick?: () => void
  background?: string
  color?: string
}

const Container = styled.div`
  border-radius: 20px;
  padding: .3rem .5rem;
  background: ${(props) => props.theme.brand300};
  color: white;
  font-size: .7rem;
  display: inline-block;

  // background
  background: ${(props) => props.background && props.background};

  // color
  color: ${(props) => props.color && props.color};
`

const Pill = ({ label, onClick, ...rest }: PillProps) => {
  return (
    <Container
      onClick={onClick}
      {...rest}
    >
      {label}
    </Container>
  )
}

export default Pill
