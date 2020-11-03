import styled from 'styled-components'

const Loading = styled.div`
  border-top: 3px solid ${props => props.theme.bgDark};
  border-right: 3px solid ${props => props.theme.bgDark};
  border-bottom: 3px solid ${props => props.theme.bgDark};
  border-left: 3px solid ${props => props.theme.brand};

  transform: translateZ(0);
  animation: load8 1.1s infinite linear;

  border-radius: 50%;
  height: 1rem;
  width: 1rem;

  &:after {
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

`;

export default Loading
