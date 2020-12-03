import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${props => props.theme.mobileM}) {
    & > div {
      width: 65%;
    }
  }
`;

interface DesktopContainerProps {
  children: React.ReactNode
}

const DesktopContainer = ({ children }: DesktopContainerProps) => {
  return (
    <Container>
      <div>
        {children}
      </div>
    </Container>
  )
}

export default DesktopContainer
