import React from 'react'
import theme from 'src/app/theme'
import styled from 'styled-components'
import Icon from '../icon'
import Loading from '../loading'

export interface ButtonProps {
  label: string
  color?: string
  bordered?: boolean
  text?: boolean
  onClick?: () => void
  isLoading?: boolean
  icon?: string
  type?: 'submit'
}

const StyledButton = styled.button`
  background: ${(props) => props.theme.brand};
  color: ${(props) => props.theme.bg};
  padding: .5rem 1rem;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 8px;

  font-size: .9rem;
  white-space: nowrap;

  display: flex;
  align-items: center;
  justify-content: center;

  // bordered
  color: ${(props) => props.bordered && props.color};
  background: ${(props) => props.bordered && props.theme.bg};
  border: ${(props) => props.bordered && `1px solid ${props.theme.brand}`};
  box-shadow: ${(props) => props.bordered && 'none'};

  // text
  color: ${(props) => props.text && props.color};
  background: ${(props) => props.text && props.theme.bg};
  padding: ${(props) => props.text && '0'};
  border: ${(props) => props.text && 'none'};
  box-shadow: ${(props) => props.text && 'none'};
  font-size: ${(props) => props.text && '1rem'};
  font-weight: ${(props) => props.text && 700};

  // isLoading, icon, text
  & > *:first-child {
    margin-right: ${(props) => (props.isLoading || props.icon) && '.5rem'};
    margin-right: ${(props) => (props.icon || props.text) && '.2rem'};
  }
`

export const Button = (props: ButtonProps) => {
  const iconFill = (props.bordered || props.text)
    ? props.color
    : theme.bg

  return (
    <StyledButton
      type={props.type || 'button'}
      color={props.color || theme.brand}
      {...props}
    >
      {props.icon && <Icon
        variant={props.icon}
        fill={iconFill}
      />}
      {props.isLoading && <Loading />}
      {props.label}
    </StyledButton>
  )
}
