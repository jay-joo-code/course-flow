import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'src/pages/Home'
import UserRegistration from 'src/pages/UserRegistration';
import useRouter from 'src/hooks/useRouter';
import useCurrentUser from 'src/hooks/useCurrentUser';
import Login from 'src/pages/Login';
import LogOut from 'src/pages/Logout';
import { useSelector } from 'react-redux'
import AuthCallback from 'src/pages/AuthCallback';
import { RootState } from 'src/types';

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
    label: 'Logout',
    isPublicNav: false,
    isPrivateNav: true,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/register',
    component: UserRegistration,
    label: 'Register',
    isPublicNav: true,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/login',
    component: Login,
    label: 'Login',
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

  if (!accessToken || accessToken.length === 0 || !user) {
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
