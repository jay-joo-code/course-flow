import React from 'react'
import { H4 } from 'src/components/globals'
import styled from 'styled-components'
import { routes } from './Routes'
import { NavLink } from 'react-router-dom'
import history from 'src/util/history'
import useRouter from 'src/hooks/useRouter'

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  & > * {
    margin-right: 1rem;
  }
`

const Header = () => {
  const headerRoutes = routes.filter((route) => route.header)
  const router = useRouter();

  if (router.pathname === '/landing') return null;

  return (
    <Container>
      {headerRoutes.map((route) => (
        <NavLink key={route.path} to={route.path}>
          <H4>{route.label}</H4>
        </NavLink>
      ))}
    </Container>
  )
}

export default Header
