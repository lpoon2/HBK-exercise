import * as React from 'react';
import { DateCell } from '../../model/date';
import { Details } from './details';
import { calendarAPI } from '../../api/calendar/index';
import { Week } from '../weeks'

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
  public getFirstDate() {
    var hash = window.location.hash.split('/');
    return parseInt(hash[2]);
  }
  public navigateCalendar(e){
    return e;
  }

  public render() {
    return (
      <div className="container">
        <div className="pull-right form-inline">
          <div className="btn-group">
            <button className="btn btn-primary" data-calendar-nav="prev" id="prev" onClick={(e)=>this.navigateCalendar(e)} >Prev</button>
            <button className="btn" data-calendar-nav="today">Current</button>
            <button className="btn btn-primary" data-calendar-nav="next" id="next" onClick={(e)=>this.navigateCalendar(e)} >Next</button>
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
