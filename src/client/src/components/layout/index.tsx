import styled from 'styled-components'

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexRow = styled.div`
  display: flex;

  // justifySpaceBetween
  justify-content: ${props => props.justifySpaceBetween && 'space-between'};

  // justifyCenter
  justify-content: ${props => props.justifyCenter && 'center'};

  // alignCenter
  align-items: ${props => props.alignCenter && 'center'};
`

export const Margin = styled.div`
  margin: ${props => props.margin && props.margin};
`;

