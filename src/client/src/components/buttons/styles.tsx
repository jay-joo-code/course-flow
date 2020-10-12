import styled from 'styled-components'

export const StyledButton = styled.button`
  border-radius: 8px;
  background: ${props => props.theme[props.color]?.default};
  color: white;
  padding: .5rem 1rem;
  cursor: pointer;
  flex-shrink: 0;
  font-size: .9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
`;
