import * as React from 'react';
import { Link } from 'react-router';

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

  public getMonthYear() {
    var hash = window.location.hash.split('/');
    if (hash.length != 4) {
      var today = new Date();
      return today.getMonth() + "/" + today.getFullYear();
    }
    return (parseInt(hash[2]) - 1) + "/" + hash[3]; // [2] - month [3] - year
  }

  public getStartDate() {
    var hash = window.location.hash.split('/');
    var month,year;
    var today = new Date();

    if (hash.length != 4) {
      month = today.getMonth() + 1;
      year = today.getFullYear();
    } else {
      month = parseInt(hash[2]);
      year = parseInt(hash[3]);
    }
    var firstDay = new Date(year, month-1 , 1);
    if (firstDay.getDay() == 0) {
      return 1;
    }

    return new Date(year, month - 1, 0).getDate() - firstDay.getDay() + 1 ;
  }

  public render() {
    return (
      <div className="container">
      <div className="pull-right form-inline">
          <div className="btn-group">
            <button className="btn btn-warning active" data-calendar-view="month">
              <Link to={"/month/"+this.getMonthYear()}>
              Month
            </Link>
            </button>
            <button className="btn btn-warning" data-calendar-view="week">
              <Link to={"/week/"+this.getStartDate()+"/"+this.getMonthYear()}>
                Week
              </Link>
            </button>
          </div>
    	</div>
    </div>
    );
  }
}
