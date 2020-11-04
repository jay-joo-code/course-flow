import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from 'src/pages/Home'
import TodoList from 'src/pages/TodoList';
import UserRegistration from 'src/pages/UserRegistration';
import Counter from 'src/pages/Counter';
import Landing from 'src/pages/Landing';
import ZoomTest from 'src/pages/ZoomTest';

export const routes = [
  {
    path: '/zoom',
    component: ZoomTest,
    label: 'Zoom Test',
    header: true,
  },
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
    path: '/',
    component: Home,
    label: 'Home',
    header: false,
  },
]

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} />
      ))}
    </Switch>
  )
}

export default Routes
