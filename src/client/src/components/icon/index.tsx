import React from 'react'
import styled from 'styled-components'
import { ReactComponent as ArticleIcon } from 'src/assets/icons/article-24px.svg'

interface IconProps {
  variant: string
  fill?: string
  size?: string
}

const IconContainer = styled.div`
  height: 1rem;
  width: 1rem;
  height: ${props => props.size && props.size};
  width: ${props => props.size && props.size};

  & svg {
    height: 100%;
    width: 100%;
    fill: ${props => props.fill && props.theme[props.fill]};
  }
`;

const Icon = (props: IconProps) => {
  const variantToComponent = {
    'article': <ArticleIcon />
  }

  return (
    <IconContainer {...props}>
      {variantToComponent[props.variant]}
    </IconContainer>
  )
}

export default Icon
