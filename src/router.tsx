import * as React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Calendar } from './calendar';
import { Month } from './components';
import { WeekDetail } from './components/weekView/weeks'

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Calendar} >
        <IndexRoute component={Calendar} />
        <Route path="/month" component={Calendar} />
        <Route path="/week" component={WeekDetail} />
      </Route>
    </Router>
  );
}
