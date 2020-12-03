import React from 'react'
import styled from 'styled-components'
import { routes } from '../../app/Routes'
import { NavLink } from 'react-router-dom'
import useRouter from 'src/hooks/useRouter'
import useNavs from 'src/hooks/useNavs'
import useIsMobile from 'src/hooks/useIsMobile'
import { FlexRow } from '../layout'
import Logo from '../logo'
import Icon from '../icon'
import theme from 'src/app/theme'
import SlideInMenu from './SlideInMenu'
import { useState } from 'react'

const Container = styled(FlexRow)`
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 1rem 1.5rem;
`

const Header = () => {
  const navs = useNavs()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  if (isMobile) {
    return (
      <>
        <Container jsb ac>
          <Logo />
          <Icon
            variant='menu'
            size='2rem'
            onClick={() => setIsOpen(!isOpen)}
            fill={theme.text}
          />
        </Container>
        <SlideInMenu 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
        />
      </>
    )
  }

  return (
    <Container>
      {navs.map((route) => (
        <NavLink key={route.path} to={route.path}>
        </NavLink>
      ))}
    </Container>
  )
}

export default Header
