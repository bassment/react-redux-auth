import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Count from './containers/Count';
import Login from './containers/Login';

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('user')) {
    replace('/login');
  }
}

const routes = (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/count" component={Count} onEnter={requireAuth} />
  </Route>
);

export default routes;
