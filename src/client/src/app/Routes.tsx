import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from 'src/pages/Home'
import TodoList from 'src/pages/TodoList';
import UserRegistration from 'src/pages/UserRegistration';
import Counter from 'src/pages/Counter';
import Header from './Header';
import history from 'src/util/history';

export const routes = [
  {
    path: '/todo',
    component: TodoList,
    label: 'Todo',
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
    path: '/',
    component: Home,
    label: 'Home',
    header: false,
  },
]

const Routes = () => {
  return (
    <BrowserRouter history={history}>
      <Header />
      <Switch>
        {routes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
