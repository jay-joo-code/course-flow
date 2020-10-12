import React from 'react'
import Loading from '../loading'
import { StyledButton } from './styles'

export interface ButtonProps {
  label: string
  color?: string
  onClick?: () => void
  isLoading?: boolean
  type?: 'submit'
}

export const Button = (props: ButtonProps) => {
  return (
    <StyledButton
      type={props.type || 'button'}
      color={props.color || 'brand'}
      {...props}
    >
      {props.isLoading
        ? <Loading color='white' />
        : props.label
      }
    </StyledButton>
  )
}

