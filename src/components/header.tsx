import * as React from 'react';
import { Link } from 'react-router';
import { HeaderAPI } from '../api/calendar/header';

interface State {
  month: number;
  year: number;
}

export class Header extends React.Component<{}, State> {

  constructor() {
    super();
    var today = new Date();
    this.state = { month: today.getMonth()+1, year: today.getFullYear()};
  }

  public render() {
    return (
      <div className="container">
      <div className="pull-right form-inline">
          <div className="btn-group">
            <button className="btn btn-warning active" data-calendar-view="month">
              <Link to={"/month/" + HeaderAPI.getMonthYear()}>
              Month
            </Link>
            </button>
            <button className="btn btn-warning" data-calendar-view="week">
              <Link to={"/week/" + HeaderAPI.getStartDate() + "/" + HeaderAPI.getMonthYear()}>
                Week
              </Link>
            </button>
          </div>
    	</div>
    </div>
    );
  }
}
