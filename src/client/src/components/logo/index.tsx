import React from 'react'
import { Link } from 'react-router-dom'
import Text from '../text'

const Logo = () => {
  return (
    <Link to='/'>
      <Text variant='h3' fontWeight={500}>cornlet</Text>
    </Link>
  )
}

export default Logo
