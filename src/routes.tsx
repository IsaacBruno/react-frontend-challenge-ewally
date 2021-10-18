import React, { FC } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';

const Routes: FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>
);

export default Routes;
