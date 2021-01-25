import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import useIsMobile from 'src/hooks/useIsMobile'
import AuthCallback from 'src/pages/AuthCallback'
import Home from 'src/pages/Home'
import Login from 'src/pages/Login'
import LogOut from 'src/pages/Logout'
import MobileBlock from 'src/pages/MobileBlock'
import { RootState } from 'src/types'

interface IRoute {
  path: string
  component: React.FC
  isPublicNav: boolean
  isPrivateNav: boolean
  isPrivateRoute: boolean
  isDesktopOnly: boolean
  label?: string
}

export const routes: IRoute[] = [
  // auth
  {
    path: '/logout',
    component: LogOut,
    label: 'Sign out',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: true,
  },
  {
    path: '/login',
    component: Login,
    label: 'Sign in',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: true,
  },
  {
    path: '/auth/callback',
    component: AuthCallback,
    label: '',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: true,
  },

  // display
  {
    path: '/mobile-block',
    component: MobileBlock,
    label: 'MobileBlock',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/',
    component: Home,
    label: 'Home',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: true,
  },
]

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { accessToken } = useSelector((state: RootState) => state.authState)

  if (!accessToken || accessToken.length === 0) {
    return <Redirect to='/login' />
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Component {...props} />
      )}
    />
  )
}

const DesktopRoute = ({ component: Component, ...rest }) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <Redirect to='/mobile-block' />
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Component {...props} />
      )}
    />
  )
}

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ path, component, isPrivateRoute, isDesktopOnly, ...rest }) => isPrivateRoute
        ? <PrivateRoute
            key={path}
            path={path}
            component={component}
            {...rest}
        />
        : isDesktopOnly
          ? <DesktopRoute
              key={path}
              path={path}
              component={component}
              {...rest}
          />
          : <Route
              key={path}
              path={path}
              component={component}
          />
      )}
    </Switch>
  )
}

export default Routes
