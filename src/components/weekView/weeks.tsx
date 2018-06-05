import * as React from 'react';
import { DateCell } from '../../model/date';
import { Details } from './details';
import { calendarAPI } from '../../api/calendar/index';
import { Week } from '../weeks'
import { Link } from 'react-router';

interface State {
  date: number;
  month: number;
  year: number;
}

export class WeekDetail extends React.Component<{},State> {

  constructor() {
    super();
    var hash = window.location.hash.split('/');
    this.state = {date: parseInt(hash[2]), month: parseInt(hash[3]), year: parseInt(hash[4])};
  }

  public displayNumber() {
    return calendarAPI.searchByDate(this.state.date, this.state.month, this.state.year);
  }

  public navigateWeek(e) {
    console.log(e); //"qsdvqk"
    var date = new Date(this.state.year, this.state.month, 0);
    var firstDay = (new Date(this.state.year, this.state.month - 2, 1)).getDay();
    var nextMonth = new Date(this.state.year, this.state.month % 12, 0);
    var back = (this.state.month - 1) < 1;
    var lastMonth = new Date(this.state.year, back ? 12 : (this.state.month - 1) ,0);
    var monthLen = date.getDate();
    var nextMonthLen = nextMonth.getDate();
    var lastMonthLen = lastMonth.getDate();

    if (e == 'next') {
      if ((this.state.date + 7) <= monthLen) {
        this.setState({date: this.state.date + 7, month: this.state.month , year: this.state.year});
        return "/week/" + (this.state.date + 7) + "/" + this.state.month + "/" + this.state.year;
      }
      else {
        var offset = 7 - (monthLen - this.state.date);
        this.setState({date: offset, month: this.state.month + 1 , year: this.state.year});
        return "/week/" + offset + "/" + this.state.month + "/" + this.state.year;
      }
    } else {
      if ((this.state.date - 7) >= 1) {
        this.setState({date: (this.state.date - 7), month: this.state.month, year: this.state.year});
        return "/week/" + (this.state.date - 7) + "/" + this.state.month + "/" + this.state.year;
      }
      else {
        var offset = 7 - (monthLen - this.state.date);
        this.setState({date: lastMonthLen - (firstDay - 1), month: back ? 12 : this.state.month - 1 , year: back ? this.state.year - 1 : this.state.year});
        return "/week/" + offset + "/" + this.state.month + "/" + this.state.year;
      }
    }
  }

  public render() {
    return (
      <div className="container">
        <div className="pull-right form-inline">
          <div className="btn-group">
            <button className="btn btn-primary" data-calendar-nav="prev" id="prev">
              Prev
            </button>
            <button className="btn btn-primary" data-calendar-nav="next" id="next">
              Next
            </button>
          </div>
        </div>
        <div className="month">
            <h1>June 2018</h1>
          <small>Calendar App for HBK software internship</small>
        </div>
        <div className="container details" id="details">
          <Details date={this.state.date} month={this.state.month} year={this.state.year}/>
          <Details date={this.state.date+1} month={this.state.month} year={this.state.year}/>
          <Details date={this.state.date+2} month={this.state.month} year={this.state.year}/>
          <Details date={this.state.date+3} month={this.state.month} year={this.state.year}/>
          <Details date={this.state.date+4} month={this.state.month} year={this.state.year}/>
          <Details date={this.state.date+5} month={this.state.month} year={this.state.year}/>
          <Details date={this.state.date+6} month={this.state.month} year={this.state.year}/>
        </div>
      </div>
    );
  }
}
