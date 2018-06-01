import * as React from 'react';
import { Link } from 'react-router';

const monthNames =  ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface State {
  month: String;
  year: number;
}

export class Header extends React.Component<{}, State> {

  constructor() {
    super();
    var today = new Date();
    this.state = { month: monthNames[today.getMonth()], year: today.getFullYear()};
  }

  public render() {
    return (
      <div className="page-header">
    		<div className="pull-right form-inline">
    			<div className="btn-group">
    				<button className="btn btn-primary" data-calendar-nav="prev">Prev</button>
    				<button className="btn" data-calendar-nav="today">Current</button>
    				<button className="btn btn-primary" data-calendar-nav="next">Next</button>
    			</div>
    			<div className="btn-group">
    				<button className="btn btn-warning active" data-calendar-view="month">Month</button>
    				<button className="btn btn-warning" data-calendar-view="week">Week</button>
    			</div>
    		</div>

    		<h1>{this.state.month}  {this.state.year}</h1>
    		<small>Calendar App for HBK software internship</small>
    	</div>
    );
  }
}
