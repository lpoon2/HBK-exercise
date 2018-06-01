import * as React from 'react';
import { DateCell } from '../model/date';
import { calendarAPI } from '../api/calendar/index';
import { Week } from './weeks';

interface State {
  dates: DateCell[];
}

export class Month extends React.Component<{}, State> {

  constructor() {
    super();
    this.state = { dates: [] };
  }

  public componentDidMount() {
    calendarAPI.fetchDates()
      .then((dates) => {
        this.setState({ dates });
      });
  }

  public render(){
    return (
      <div className="container">
        <Week/>
        <Week/>
        <Week/>
        <Week/>
        <Week/>
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
