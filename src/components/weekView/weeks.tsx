import * as React from 'react';
import { DateCell } from '../../model/date';
import { Details } from './details';
import { calendarAPI } from '../../api/calendar/index';
import { Week } from '../weeks'

interface Props {
  date: number;
  month: number;
  year: number;
}

export class WeekDetail extends React.Component<Props, {}> {

  public displayNumber() {
    return calendarAPI.searchByDate(this.props.date, this.props.month, this.props.year);
  }

  public render() {
    return (
      <div className="container">
        <Details date={this.props.date} month={this.props.month} year={this.props.year}/>
        <Details date={this.props.date} month={this.props.month} year={this.props.year}/>
        <Details date={this.props.date} month={this.props.month} year={this.props.year}/>
        <Details date={this.props.date} month={this.props.month} year={this.props.year}/>
        <Details date={this.props.date} month={this.props.month} year={this.props.year}/>
      </div>
    );
  }
}
