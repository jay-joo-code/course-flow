import React from 'react'
import { Router, Switch, Route } from 'react-router-dom';

import history from 'src/util/browserHistory';
import Home from 'src/pages/Home'
import TodoList from 'src/pages/TodoList';
import UserRegistration from 'src/pages/UserRegistration';

const routes = [
  {
    path: '/todo',
    component: TodoList
  },
  {
    path: '/register',
    component: UserRegistration
  },
]

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} component={component} />
          ))}
      </Switch>
    </Router>
  )
}

export default Routes
