import * as React from 'react';
import { DateCell } from '../model/date';
import { calendarAPI } from '../api/calendar/index';
import { Week } from './weeks';
import { Link } from 'react-router';

const monthNames =  ["January", "February", "March", "April", "May", "June",
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
    this.state = {startDates: calendarAPI.init(), month: today.getMonth(), year: today.getFullYear()};
  }

  public onChangeListener(startDates, action, updatedMonth, updatedYear) {
    var updatedStartDates = calendarAPI.updateCalendar(startDates, action, updatedYear, updatedMonth + 1);
    this.setState({startDates: updatedStartDates, month: updatedMonth, year: updatedYear});
  }

  public navigateCalendar(e) {
    var prev = ((this.state.month - 1) < 0 ) ? 11: (this.state.month - 1);
    var next = ((this.state.month + 1) > 11) ? 0: (this.state.month + 1);
    var updatedMonth = e.target.id == 'prev' ? prev : next;
    var updatedYear = this.state.year;

    if (updatedMonth == 11 && e.target.id == 'prev') {
        updatedYear = this.state.year - 1;
    } else if (updatedMonth == 0 && e.target.id == 'next') {
        updatedYear = this.state.year + 1;
    }

    //this.props.eventListener(this.props.startDates, e.target.id, updatedMonth, updatedYear);
    //this.setState({month: updatedMonth, year: updatedYear});
    this.onChangeListener(this.state.startDates, e.target.id, updatedMonth, updatedYear);
  }

  public render(){
    return (
      <div className="container">
        <div className="pull-right form-inline">
          <div className="btn-group">
            <Link to={"/month/"+(this.state.month)+"/"+(this.state.year)} id="prev">
              <button className="btn btn-primary" data-calendar-nav="prev" id="prev" onClick={(e)=>this.navigateCalendar(e)} >
                Prev
              </button>
            </Link>
            <Link to={"/month/"+(this.state.month+2)+"/"+(this.state.year)} id="next">
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
        <Week startDate={this.state.startDates[0]} month={this.state.month} year={this.state.year}/>
        <Week startDate={this.state.startDates[1]} month={this.state.month} year={this.state.year} />
        <Week startDate={this.state.startDates[2]} month={this.state.month} year={this.state.year}/>
        <Week startDate={this.state.startDates[3]} month={this.state.month} year={this.state.year}/>
        <Week startDate={this.state.startDates[4]} month={this.state.month} year={this.state.year}/>
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
