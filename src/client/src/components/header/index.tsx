import React from 'react'
import styled from 'styled-components'
import { routes } from '../../app/Routes'
import { Link, NavLink } from 'react-router-dom'
import useRouter from 'src/hooks/useRouter'
import useNavs from 'src/hooks/useNavs'
import useIsMobile from 'src/hooks/useIsMobile'
import { FlexRow } from '../layout'
import Logo from '../logo'
import Icon from '../icon'
import theme from 'src/app/theme'
import SlideInMenu from './SlideInMenu'
import { useState } from 'react'
import DesktopContainer from '../layout/DesktopContainer'
import Text from '../text'

const MobileContainer = styled(FlexRow)`
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 1rem 1.5rem;
`

const Container = styled.div`
  border-bottom: 1px solid ${props => props.theme.border};
`;

const NavList = styled(FlexRow)`
  & > * {
    margin-right: 1rem;
  }
`;

const Header = () => {
  const navs = useNavs()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  if (isMobile) {
    return (
      <>
        <MobileContainer jsb ac>
          <Logo variant='brand' />
          <Icon
            variant='menu'
            size='2rem'
            onClick={() => setIsOpen(!isOpen)}
            fill={theme.text}
          />
        </MobileContainer>
        <SlideInMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </>
    )
  }

  return (
    <Container>
      <DesktopContainer>
        <FlexRow ac jsb fullWidth style={{ padding: '.5rem' }}>
          <Logo variant='brand' />
          <NavList ac>
            {navs.map((nav) => (
              <div key={nav.path}>
                <Link to={nav.path}>
                  <Text variant='h5' fontWeight={500}>{nav.label}</Text>
                </Link>
              </div>
            ))}
          </NavList>
        </FlexRow>
      </DesktopContainer>
    </Container>
  )
}

export default Header
