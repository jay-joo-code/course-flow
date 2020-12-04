import React from 'react'
import { Link } from 'react-router-dom';
import useIsMobile from 'src/hooks/useIsMobile';
import useNavs from 'src/hooks/useNavs';
import styled from 'styled-components'
import { FlexRow, Space } from '../layout';
import DesktopContainer from '../layout/DesktopContainer';
import Logo from '../logo';
import Text from '../text';

const Container = styled.div`
  padding: 2rem 1.5rem 1rem 1.5rem;
  background: ${props => props.theme.grey[50]};
`;

const MenuList = styled.div`
  & > * {
    margin-bottom: .5rem;
  }
`;

const Footer = () => {
  const navs = useNavs()
  const isMobile = useIsMobile()

  return (
    <Container>
      <DesktopContainer>
        <FlexRow jsb flexDirection={isMobile && 'column'}>
          <Logo />
          {isMobile && <Space margin='1rem 0' />}
          <MenuList>
            <Text variant='h5' fontWeight={500}>MENU</Text>
            {navs.map((nav) => (
              <div key={nav.path}>
                <Link to={nav.path}>
                  <Text variant='h5' color='textLight'>{nav.label}</Text>
                </Link>
              </div>
            ))}
          </MenuList>
        </FlexRow>
        <Space margin='3rem 0' />
        <Text variant='h6' color='textLight'>© 2020 SampleCompany. All rights reserved.</Text>
        <Space margin='1rem 0' />
      </DesktopContainer>
    </Container>
  )
}

export default Footer
