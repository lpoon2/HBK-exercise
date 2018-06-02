import * as React from 'react';
import { calendarAPI } from '../api/calendar/index';

interface Props {
  date: number;
  month: number;
  year: number;
}

export class Notification extends React.Component<Props, {}> {

  public displayNumber() {

    return calendarAPI.searchByDate(this.props.date, this.props.month, this.props.year);
  }

  public render() {
    if (this.displayNumber()){
      return (
        <button type="button" className="btn btn-lg btn-danger notification" data-toggle="popover" title="things to do" data-content="0">{this.displayNumber()}</button>
      );
    }
    return (
      <button type="button" className="btn btn-secondary notification" data-toggle="popover" title="no events" data-content="0">0</button>
    );
  }
}
