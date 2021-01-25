import React from 'react'
import theme from 'src/app/theme'
import { FlexColumn, Space } from '../layout'
import Text from '../text'

const Footer = () => {
  return (
    <FlexColumn ac>
      <Text
        variant='h5'
        color={theme.textMuted}
      >Designed and developed by Jay Joo</Text>
      <Space margin='1rem 0' />
    </FlexColumn>
  )
}

export default Footer
