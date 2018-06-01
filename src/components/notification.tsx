import * as React from 'react';
import { calendarAPI } from '../api/calendar/index';

interface Props {
  date: number;
  month: number;
  year: number;
}

export class Notification extends React.Component<Props, {}> {

  public displayNumber() {
    console.log(this.props.month);
    console.log(this.props.year);
    console.log(this.props.date);
    return calendarAPI.searchByDate(this.props.date, this.props.month, this.props.year);
  }

  public render() {
    if (/*this.displayNumber()*/ true){
      return (
        <svg width="100" height="100">
          <circle cx="40" cy="40" r="20" fill="red" />
          <text x="50%" y="30%" text-anchor="middle" fill="#fff" dy=".3em">
            <tspan x="35%" dy=".6em">{this.displayNumber()}</tspan>
          </text>
        </svg>
      );
    }
  }
}
