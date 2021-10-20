import React, { FC } from 'react';
import { Switch, BrowserRouter as Router, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from './contexts/auth';

import Home from './pages/Home';
import Login from './pages/Login';

interface CustomRouteProps extends RouteProps {
  component: any;
  isPrivate?: boolean;
}

const CustomRoute: FC<CustomRouteProps> = ({ component: Component, isPrivate, ...rest }) => {
  const { signed } = useAuth();

  if (isPrivate && !localStorage.getItem('@EwallyAuth:token')) {
    return <Redirect to="/login" />;
  }

  return <Component {...rest} />;
};

const Routes: FC = () => (
  <Router>
    <Switch>
      <CustomRoute isPrivate exact path="/" component={Home} />
      <CustomRoute exact path="/login" component={Login} />
    </Switch>
  </Router>
);

export default Routes;
