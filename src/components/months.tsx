import * as React from 'react';
import { DateCell } from '../model/date';
import { calendarAPI } from '../api/calendar/index';
import { Week } from './weeks';

interface State {
  startDates: number[];
}

interface Props {
  startDates: number[];
  month: number;
  year: number;
}

export class Month extends React.Component<Props, State> {

  constructor() {
    super();
    this.state = {startDates:[]};
  }

  public render(){
    return (
      <div className="container">
        <Week startDate={this.props.startDates[0]} month={this.props.month} year={this.props.year}/>
        <Week startDate={this.props.startDates[1]} month={this.props.month} year={this.props.year} />
        <Week startDate={this.props.startDates[2]} month={this.props.month} year={this.props.year}/>
        <Week startDate={this.props.startDates[3]} month={this.props.month} year={this.props.year}/>
        <Week startDate={this.props.startDates[4]} month={this.props.month} year={this.props.year}/>
      </div>
    );
  }
}

const DateHeader = () => {
  return (
    <tr>
      <th>Date</th>
    </tr>
  );
}

const DateRow = (date: DateCell) => {
  return (
    <tr key={date.date}>
      <td>
        <span>{date.year}</span>
      </td>
      <td>
        <span>{date.day}</span>
      </td>
      <td>
        <span>{date.date}</span>
      </td>
      <td>
        <span>{date.items.length}</span>
      </td>
    </tr>
  );
}
