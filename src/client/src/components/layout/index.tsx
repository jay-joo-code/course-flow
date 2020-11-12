import styled from 'styled-components'

const FlexElement = styled.div`
  display: flex;

  // justifySpaceBetween
  justify-content: ${props => props.justifySpaceBetween && 'space-between'};

  // justifyCenter
  justify-content: ${props => props.justifyCenter && 'center'};

  // justifyEnd
  justify-content: ${props => props.justifyEnd && 'flex-end'};

  // alignCenter
  align-items: ${props => props.alignCenter && 'center'};

  // wrap
  flex-wrap: ${props => props.wrap && 'wrap'};
`;

export const FlexColumn = styled(FlexElement)`
  flex-direction: column;
`;

export const FlexRow = styled(FlexElement)`
`

export const Margin = styled.div`
  margin: ${props => props.margin && props.margin};
`;

export const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    width: 65%;
  }
`;

export const WashedTextbox = styled.div`
  background: ${props => props.theme.bgWash};
  padding: .5rem;
  max-height: 200px;
  overflow-y: auto;
`;

export const AnimatedExpansionContainer = styled.div`
  max-height: 0;
  transition: max-height .5s ease-in-out;
  overflow: hidden;

  // expanded
  max-height: ${props => props.expanded && '100vh'};
`;

