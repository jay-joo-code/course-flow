import styled from 'styled-components'

export const StyledButton = styled.button`
  border-radius: 8px;
  background: ${props => props.theme[props.color]?.default};
  color: white;
  padding: .5rem 1rem;
  cursor: pointer;
`;
