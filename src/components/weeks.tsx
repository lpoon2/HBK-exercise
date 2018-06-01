import * as React from 'react';
import { DateCell } from '../model/date';

interface State {
  dates: DateCell[];
  monthLen: number; /*number of days each month has*/
}

interface Props {
  startDate: number;
  month: number;
  year: number;
}

export class Week extends React.Component<Props,State>{

  constructor() {
    super();
    var today = new Date();
    var len = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    this.state = {dates: [], monthLen: len};
  }

  public daysInMonth () {
    return new Date(this.props.year, this.props.month, 0).getDate();
  }

  public getDate(date,len) {
    var remainder = (date) % len;
    return remainder == 0? len : remainder;
  }

  public render() {
    return (
        <div className ="row">
          <div className="col-lg-1">
            Sunday
            <span className="pull-right">{this.getDate((this.props.startDate), this.daysInMonth())}</span>
          </div>
          <div className ="col-lg-1">
            Monday
            <span className="pull-right">{this.getDate((this.props.startDate+1), this.daysInMonth())}</span>
          </div>
          <div className="col-lg-1">
            Tuesday
            <span className="pull-right">{this.getDate((this.props.startDate+2), this.daysInMonth())}</span>
          </div>
          <div className="col-lg-1">
            Wednesday
            <span className="pull-right">{this.getDate((this.props.startDate+3), this.daysInMonth())}</span>
          </div>
          <div className="col-lg-1">
            Thursday
            <span className="pull-right">{this.getDate((this.props.startDate+4), this.daysInMonth())}</span>
          </div>
          <div className="col-lg-1">
            Friday
            <span className="pull-right">{this.getDate((this.props.startDate+5), this.daysInMonth())}</span>
          </div>
          <div className="col-lg-1">
            Saturday
            <span className="pull-right">{this.getDate((this.props.startDate+6), this.daysInMonth())}</span>
          </div>
        </div>
    );
  }
}
