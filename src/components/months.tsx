import * as React from 'react';
import { DateCell } from '../model/date';
import { calendarAPI } from '../api/calendar/index';
import { Week } from './weeks';
import { Link } from 'react-router';

const monthNames =  ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface State {
  startDates: number[];
  month: number;
  year: number;
}

export class Month extends React.Component<{}, State> {

  constructor() {
    super();
    var today = new Date();
    this.state = {startDates: calendarAPI.init(), month: today.getMonth()+1, year: today.getFullYear()};
  }

  public navigateCalendar(e) {
    var prev = ((this.state.month - 1) < 1 ) ? 12: (this.state.month - 1);
    var next = ((this.state.month + 1) > 12) ? 1: (this.state.month + 1);
    var updatedMonth = e.target.id == 'prev' ? prev : next;
    var updatedYear = this.state.year;

    if (updatedMonth == 12 && e.target.id == 'prev') {
        updatedYear = this.state.year - 1;
    } else if (updatedMonth == 1 && e.target.id == 'next') {
        updatedYear = this.state.year + 1;
    }
    var updatedStartDates = calendarAPI.updateCalendar(this.state.startDates, e.target.id, updatedYear, updatedMonth);
    this.setState({startDates: updatedStartDates, month: updatedMonth, year: updatedYear});
  }
  public timeElpise = 0;
  public firstClick = false;

  public response(e,firstDay) {
    if (!(this.firstClick)) {
      this.firstClick = !(this.firstClick);
      this.timeElpise = (new Date()).getSeconds();
    } else {
      let diff = (new Date()).getSeconds() - this.timeElpise;
      console.log(e.target);
      //getElementsByTagName("P")[0].innerHTML
      if ((diff == 0) || (diff == 1)) {
        console.log('#/week/' + this.state.startDates[0] + '/' + this.state.month + '/' + this.state.year);
        window.location.href = '#/week/' + firstDay + '/' + this.state.month + '/' + this.state.year;
      }
      this.firstClick = !(this.firstClick);
    }
    return e;
  }
  public render(){
    return (
      <div className="container">
        <div className="pull-right form-inline">
          <div className="btn-group">
            <Link to={"/month/"+(this.state.month-1)+"/"+(this.state.year)} id="prev">
              <button className="btn btn-primary" data-calendar-nav="prev" id="prev" onClick={(e)=>this.navigateCalendar(e)} >
                Prev
              </button>
            </Link>
            <Link to={"/month/"+(this.state.month+1)+"/"+(this.state.year)} id="next">
              <button className="btn btn-primary" data-calendar-nav="next" id="next" onClick={(e)=>this.navigateCalendar(e)} >
                Next
              </button>
            </Link>
          </div>
        </div>
        <div className="month">
    		    <h1>{monthNames[this.state.month]}  {this.state.year}</h1>
    		  <small>Calendar App for HBK software internship</small>
        </div>
        <a onClick={(e)=>this.response(e, this.state.startDates[0])}>
        <Week startDate={this.state.startDates[0]} month={this.state.month} year={this.state.year}/>
        </a>
        <a onClick={(e)=>this.response(e, this.state.startDates[1])}>
        <Week startDate={this.state.startDates[1]} month={this.state.month} year={this.state.year} />
        </a>
        <a onClick={(e)=>this.response(e, this.state.startDates[2])}>
        <Week startDate={this.state.startDates[2]} month={this.state.month} year={this.state.year}/>
        </a>
        <a onClick={(e)=>this.response(e, this.state.startDates[3])}>
        <Week startDate={this.state.startDates[3]} month={this.state.month} year={this.state.year}/>
        </a>
        <a onClick={(e)=>this.response(e, this.state.startDates[4])}>
        <Week startDate={this.state.startDates[4]} month={this.state.month} year={this.state.year}/>
        </a>
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
