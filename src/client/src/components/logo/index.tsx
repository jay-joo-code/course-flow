import React from 'react'
import { Link } from 'react-router-dom'
import theme from 'src/app/theme'
import Text from '../text'

interface LogoProps {
  variant: 'brand' | 'black'
}

const Logo = ({ variant }: LogoProps) => {
  const variantToColor = {
    'brand': theme.brand,
    'black': theme.text,
  }
  return (
    <Link to='/'>
      <Text 
        variant='h3' 
        fontWeight={500}
        color={variantToColor[variant]}
      >
        cornlet
      </Text>
    </Link>
  )
}

export default Logo
