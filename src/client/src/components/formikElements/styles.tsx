import styled from 'styled-components';
import { H5 } from '../globals';

export const StyledField = styled.div`
  margin: ${props => props.automargin && '.5rem 0'};
`;

export const FieldError = styled(H5)`
  margin-top: 6px;
  line-height: 1;
  color: ${props => props.theme.core.danger};
`;