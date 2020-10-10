import React from 'react'
import { Router, Switch, Route } from 'react-router-dom';

import history from 'src/util/browserHistory';
import Home from 'src/pages/Home'

const routes = [
  {
    path: '/auth',
    component: Home
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
