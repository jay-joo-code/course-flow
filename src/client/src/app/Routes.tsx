import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from 'src/types';
import { useSelector } from 'react-redux'
import useCurrentUser from 'src/hooks/useCurrentUser';
import useRouter from 'src/hooks/useRouter';

import Home from 'src/pages/Home'
import Login from 'src/pages/Login';
import LogOut from 'src/pages/Logout';
import AuthCallback from 'src/pages/AuthCallback';
import New from 'src/pages/New';
import Edit from 'src/pages/Edit';

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
  {
    path: '/edit/5fd0b76361d5d548d6ae96b8',
    component: Edit,
    label: 'Test Listing',
    isPublicNav: false,
    isPrivateNav: true,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/edit/:lid',
    component: Edit,
    label: 'Edit Listing',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/new',
    component: New,
    label: 'Create Listing',
    isPublicNav: true,
    isPrivateNav: true,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },

  // auth
  {
    path: '/logout',
    component: LogOut,
    label: 'Sign out',
    isPublicNav: false,
    isPrivateNav: true,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/login',
    component: Login,
    label: 'Sign in',
    isPublicNav: true,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/auth/callback',
    component: AuthCallback,
    label: '',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },

  // display
  {
    path: '/',
    component: Home,
    label: 'Home',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
]

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ path, component, isPrivateRoute }) => isPrivateRoute
        ? <PrivateRoute key={path} path={path} component={component} />
        : <Route key={path} path={path} component={component} />
      )}
    </Switch>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const router = useRouter()
  const { accessToken } = useSelector((state: RootState) => state.authState)
  const user = useCurrentUser()

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
  );
};

export default Routes
