import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from 'src/pages/Home'
import TodoList from 'src/pages/TodoList';
import UserRegistration from 'src/pages/UserRegistration';
import Counter from 'src/pages/Counter';
import Landing from 'src/pages/Landing';
import useRouter from 'src/hooks/useRouter';
import { showToast } from 'src/util/toast';
import useCurrentUser from 'src/hooks/useCurrentUser';

export const routes = [
  {
    path: '/register',
    component: UserRegistration,
    label: 'Register',
    header: true,
  },
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
      ? (
        <PrivateRoute key={path} path={path} component={component} />
        ) 
      : (
        <Route key={path} path={path} component={component} />
      )
      )}
    </Switch>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useCurrentUser()
  const router = useRouter()

  if (!user) {
    router.push('/login')
    return null
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
