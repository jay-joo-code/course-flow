import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from 'src/pages/Home'
import TodoList from 'src/pages/TodoList';
import UserRegistration from 'src/pages/UserRegistration';
import Counter from 'src/pages/Counter';
import Landing from 'src/pages/Landing';
import useRouter from 'src/hooks/useRouter';
import { showToast } from 'src/util/toast';
import useCurrentUser from 'src/hooks/useCurrentUser';
import Login from 'src/pages/Login';
import LogOut from 'src/pages/Logout';
import CurrentUser from 'src/pages/CurrentUser';
import { useSelector } from 'react-redux'
import { getAuthToken } from 'src/util/authToken';
import AuthCallback from 'src/pages/AuthCallback';

export const routes = [
  // auth
  {
    path: '/logout',
    component: LogOut,
    label: 'Logout',
    header: true,
  },
  {
    path: '/register',
    component: UserRegistration,
    label: 'Register',
    header: true,
  },
  {
    path: '/login',
    component: Login,
    label: 'Login',
    header: true,
  },
  {
    path: '/current-user',
    component: CurrentUser,
    label: 'Current User',
    header: true,
  },
  {
    path: '/auth/callback',
    component: AuthCallback,
    label: '',
    header: false,
  },

  // examples
  {
    path: '/counter',
    component: Counter,
    label: 'Counter',
    header: true,
  },
  {
    path: '/landing',
    component: Landing,
    label: 'Landing',
    header: true,
  },
  {
    path: '/todo',
    component: TodoList,
    label: 'TodoList',
    header: true,
    isPrivateRoute: true,
  },

  // display
  {
    path: '/',
    component: Home,
    label: 'Home',
    header: false,
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
  const token = getAuthToken()
  const user = useCurrentUser()

  if (!token || token.length === 0 || !user) {
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
