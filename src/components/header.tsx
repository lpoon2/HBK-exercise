import * as React from 'react';
import { Link } from 'react-router';

const monthNames =  ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface State {
  month: number;
  year: number;
}

interface Props {
  eventListener: any;
  startDates: number[];
}

export class Header extends React.Component<Props, State> {

  constructor() {
    super();
    var today = new Date();
    this.state = { month: today.getMonth(), year: today.getFullYear()};
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
    
    this.props.eventListener(this.props.startDates, e.target.id, updatedMonth, updatedYear);
    this.setState({month: updatedMonth, year: updatedYear});
  }

  public render() {
    return (
      <div className="page-header">
        <div className="pull-right form-inline">
          <div className="btn-group">
            <button className="btn btn-primary" data-calendar-nav="prev" id="prev" onClick={(e)=>this.navigateCalendar(e)} >Prev</button>
            <button className="btn" data-calendar-nav="today">Current</button>
            <button className="btn btn-primary" data-calendar-nav="next" id="next" onClick={(e)=>this.navigateCalendar(e)} >Next</button>
          </div>
          <div className="btn-group">
            <button className="btn btn-warning active" data-calendar-view="month">Month</button>
            <button className="btn btn-warning" data-calendar-view="week">Week</button>
          </div>
        </div>
        <div className="month">
    		    <h1>{monthNames[this.state.month]}  {this.state.year}</h1>
    		  <small>Calendar App for HBK software internship</small>
        </div>
    	</div>
    );
  }
}
