import * as React from 'react';
import { Header } from './components';
import { Month } from './components/months'
import { calendarAPI } from './api/calendar/index';

interface State {
  curMonth: number;
  curYear: number;
}

export class Calendar extends React.Component<{}, State> {

  constructor() {
    super();
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    this.state = {curMonth: month, curYear: year};
  }

  public render() {
    return (
      <div>
        <Header  /*eventListener={this.onChangeListener.bind(this)}*/ />
        {this.props.children}
      </div>
    );
  }
}
