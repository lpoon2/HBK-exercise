import * as React from 'react';
import { Header } from './components';
import { Month } from './components/months'
import { calendarAPI } from './api/calendar/index';

interface State {
  startDates: number[];
  curMonth: number;
  curYear: number;
}

export class Calendar extends React.Component<{}, State> {

  constructor() {
    super();
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    this.state = { startDates: calendarAPI.init(), curMonth: month, curYear: year};
  }

  public onChangeListener(startDates, action, updatedMonth, updatedYear) {
    var updatedStartDates = calendarAPI.updateCalendar(startDates, action, updatedYear, updatedMonth + 1);
    this.setState({startDates: updatedStartDates, curMonth: updatedMonth, curYear: updatedYear});
  }

  public render() {
    return (
      <div>
        <Header startDates={this.state.startDates} eventListener={this.onChangeListener.bind(this)}/>
        <Month startDates={this.state.startDates} month={this.state.curMonth} year={this.state.curYear}/>
      </div>
    );
  }
}
