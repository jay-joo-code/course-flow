import React from 'react'
import styled from 'styled-components'
import Icon from '../icon'
import { FlexRow, Space } from '../layout'

interface AvatarProps {
  src: string
}

const AvatarContainer = styled(FlexRow)`
  cursor: pointer;
`

const ImgContainer = styled.div`
  overflow: hidden;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.shadow};
`

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const Avatar = ({ src }: AvatarProps) => {
  return (
    <AvatarContainer ac>
      <ImgContainer>
        <Img src={src} />
      </ImgContainer>
      <Space margin='0 .1rem' />
      <Icon
        variant='down'
        size='1.5rem'
      />
    </AvatarContainer>
  )
}

export default Avatar
