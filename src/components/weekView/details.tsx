import * as React from 'react';
import { DateCell } from '../../model/date';
import { Notification } from '../notification';

const dayNames =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface State {
  dates: DateCell[];
  monthLen: number; /*number of days each month has*/
}

interface Props {
  date: number;
  month: number;
  year: number;
}

export class Details extends React.Component<Props,State>{

  constructor() {
    super();
    var today = new Date();
    var len = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    this.state = {dates: [], monthLen: len};
  }

  public daysInMonth () {
    return new Date(this.props.year, this.props.month, 0).getDate();
  }

  public getDayName() {
    var date = new Date(this.props.year, this.props.month-2, this.props.date);
    console.log([this.props.month,this.props.date]);
    return dayNames[date.getDay()];
  }

  public getDate(date,len) {
    var remainder = (date) % len;
    return remainder == 0? len : remainder;
  }

  public render() {
    return (
          <div className="col-lg-1">
            {this.getDayName()}
            <span className="pull-right"></span>
            <p>{this.props.date}</p>
            <ul className="list-group">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>

    );
  }
}
