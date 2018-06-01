import * as React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { App } from './app';
import { Month, Week } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Month} />
        <Route path="/month" component={Month} />
        <Route path="/week" component={Week} />
      </Route>
    </Router>
  );
}
