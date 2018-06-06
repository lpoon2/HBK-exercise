import * as React from 'react';
import { DateCell } from '../../model/date';
import { Details } from './details';
import { calendarAPI } from '../../api/calendar/index';
import { Week } from '../weeks'
import { Link } from 'react-router';
import { AddItem } from './addItem';

const monthNames =  ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface State {
  date: number;
  month: number;
  year: number;
  childItems: any;
}

export class WeekDetail extends React.Component<{},State> {

  constructor() {
    super();
    var hash = window.location.hash.split('/');
    this.state = {date: parseInt(hash[2]), month: parseInt(hash[3]), year: parseInt(hash[4]), childItems: this.buildChildItems(parseInt(hash[2]), parseInt(hash[3]), parseInt(hash[4]))};
  }

  componentDidMount() {
    var res = this.buildChildItems(this.state.date, this.state.month, this.state.year);
    this.setState({date: this.state.date, month: this.state.month , year: this.state.year, childItems: res});
  }

  public buildChildItems(date, month, year) {
    var res = [];
    for(var i = 0 ; i < 7 ; i++) {
      res[i] = calendarAPI.getItemsByDate(date+i, month, year);
    }
    return res;
  }

  public getChildItems(date, month, year) {
    return  calendarAPI.getItemsByDate(date, month, year);
  }

  public navigateWeekNext() {
    var date = new Date(this.state.year, this.state.month, 0);
    var firstDay = (new Date(this.state.year, this.state.month - 2, 1)).getDay();
    var nextMonth = new Date(this.state.year, this.state.month % 12, 0);
    var back = (this.state.month - 1) < 1;
    var lastMonth = new Date(this.state.year, back ? 12 : (this.state.month - 1) ,0);
    var monthLen = date.getDate();
    var nextMonthLen = nextMonth.getDate();
    var lastMonthLen = lastMonth.getDate();
    var nextItems = [];

    if ((this.state.date + 7) <= monthLen) {
      nextItems = this.buildChildItems(this.state.date + 7, this.state.month, this.state.year);
      this.setState({date: this.state.date + 7, month: this.state.month , year: this.state.year, childItems: nextItems});
    }
    else {
      var offset = 7 - (monthLen - this.state.date);
      nextItems = this.buildChildItems(offset, this.state.month + 1, this.state.year);
      this.setState({date: offset, month: this.state.month + 1 , year: this.state.year, childItems: nextItems});
    }
  }

  public navigateWeekPrev() {
    var date = new Date(this.state.year, this.state.month, 0);
    var firstDay = (new Date(this.state.year, this.state.month - 2, 1)).getDay();
    var nextMonth = new Date(this.state.year, this.state.month % 12, 0);
    var back = (this.state.month - 1) < 1;
    var lastMonth = new Date(this.state.year, back ? 12 : (this.state.month - 1) ,0);
    var monthLen = date.getDate();
    var nextMonthLen = nextMonth.getDate();
    var lastMonthLen = lastMonth.getDate();
    var nextItems = [];

    if ((this.state.date - 7) >= 1) {
      nextItems = this.buildChildItems(this.state.date - 7, this.state.month, this.state.year);
      this.setState({date: this.state.date - 7, month: this.state.month , year: this.state.year, childItems: nextItems});
    }
    else {
      var offset = 7 - (monthLen - this.state.date);
      nextItems = this.buildChildItems(lastMonthLen - (firstDay - 1), back ? 12 : this.state.month - 1 , back ? this.state.year - 1 : this.state.year);
      this.setState({date: lastMonthLen - (firstDay - 1), month: back ? 12 : this.state.month - 1 , year: back ? this.state.year - 1 : this.state.year, childItems: nextItems});
    }
  }

  public onEventAdd(newItem) {
    console.log('weeks-onEventAdd:');
    console.log(newItem);
    var updateChildItems = this.state.childItems;
    var cur_state = this.state;
    var matched = false;

    this.state.childItems.forEach(function(data, index) {
      if(((cur_state.date + index) == newItem.date) && (cur_state.month == newItem.month) && (cur_state.year == newItem.year)) {
        updateChildItems[index] = updateChildItems[index].concat(newItem.items);
        matched = !matched;
      }
    });

    if (matched) {
      this.setState({date: newItem.date, month: newItem.month, year: newItem.year, childItems: updateChildItems});
    }

  }

  public render() {
    return (
      <div className="container">
        <div className="pull-right form-inline">
          <div className="btn-group">
            <button className="btn btn-primary" data-calendar-nav="prev" id="prev" onClick={this.navigateWeekPrev.bind(this)}>
              Prev
            </button>
            <button className="btn btn-primary" data-calendar-nav="next" id="next" onClick={this.navigateWeekNext.bind(this)}>
              Next
            </button>
          </div>
        </div>
        <div className="month">
          <h1>{monthNames[this.state.month]} {this.state.year}</h1>
          <small>Calendar App for HBK software internship</small>
        </div>
        <div className="container details" id="details">
          <Details date={this.state.date} month={this.state.month}
            year={this.state.year} items={this.state.childItems[0]}/>
          <Details date={this.state.date+1} month={this.state.month}
            year={this.state.year} items={this.state.childItems[1]}/>
          <Details date={this.state.date+2} month={this.state.month}
            year={this.state.year} items={this.state.childItems[2]}/>
          <Details date={this.state.date+3} month={this.state.month}
            year={this.state.year} items={this.state.childItems[3]}/>
          <Details date={this.state.date+4} month={this.state.month}
            year={this.state.year} items={this.state.childItems[4]}/>
          <Details date={this.state.date+5} month={this.state.month}
            year={this.state.year} items={this.state.childItems[5]}/>
          <Details date={this.state.date+6} month={this.state.month}
            year={this.state.year} items={this.state.childItems[6]}/>
        </div>
        <AddItem date={this.state.date} month={this.state.month} year={this.state.year} onEventAdd={this.onEventAdd.bind(this)}/>
      </div>
    );
  }
}
