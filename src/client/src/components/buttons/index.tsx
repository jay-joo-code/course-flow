import React from 'react'
import { StyledButton } from './styles'

export interface ButtonProps {
  label: string,
  color: 'primary' | 'secondary' | 'warning' | 'success' | 'danger',
  onClick?: () => void
}

export const Button = (props: ButtonProps) => {
  return (
  <StyledButton {...props}>{props.label}</StyledButton>
  )
}

