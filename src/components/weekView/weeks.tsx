import * as React from 'react';
import { DateCell } from '../../model/date';
import { Details } from './details';
import { calendarAPI } from '../../api/calendar/index';
import { Week } from '../weeks'
import { Link } from 'react-router';
import { AddItem } from './addItem';
import { dates } from '../../api/calendar/mockData'

const monthNames =  ["", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface State {
  date: number;
  month: number;
  year: number;
  childItems: any;
  payload: any;
}

export class WeekDetail extends React.Component<{},State> {

  constructor() {
    super();
    var hash = window.location.hash.split('/');
    this.state = {
      date: parseInt(hash[2]),
      month: parseInt(hash[3]),
      year: parseInt(hash[4]),
      payload: dates,
      childItems: this.buildChildItems(parseInt(hash[2]), parseInt(hash[3]), parseInt(hash[4]))
    };
  }
  public tempData = dates;
  public buildChildItems(date, month, year) {
    var res = [];
    for(var i = 0 ; i < 7 ; i++) {
      let index = this.searchByDate(date+i, month, year, '');
      if (index != -1) {
        if (this.state == undefined){
          res[i] = this.tempData[index].items;
        } else {
          res[i] = this.state.payload[index].items;
        }
      } else {
        res[i] = [];
      }
    }
    return res;
  }

  public navigateWeekNext() {
    var date = new Date(this.state.year, this.state.month, 0);
    var firstDay = (new Date(this.state.year, this.state.month - 2, 1)).getDay();
    var next = (this.state.month + 1) > 12;
    var nextMonth = new Date(this.state.year, next ? 1 : (this.state.month + 1),0);
    var monthLen = date.getDate();
    var nextMonthLen = nextMonth.getDate();
    var nextItems = [];

    if ((this.state.date + 7) <= monthLen) {
      nextItems = this.buildChildItems(this.state.date + 7, this.state.month, this.state.year);
      this.setState({
        date: this.state.date + 7,
        month: this.state.month,
        year: this.state.year,
        childItems: nextItems,
        payload: this.state.payload
      });
    }
    else {
      var offset = 7 - (monthLen - this.state.date);
      var monthNext = next ? 1 : this.state.month + 1;
      var yearNext = next ? this.state.year + 1 : this.state.year;
      nextItems = this.buildChildItems(offset, monthNext, yearNext);
      this.setState({
        date: offset,
        month: monthNext,
        year: yearNext,
        childItems: nextItems,
        payload: this.state.payload
      });
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
      this.setState({
        date: this.state.date - 7,
        month: this.state.month,
        year: this.state.year,
        childItems: nextItems,
        payload: this.state.payload
      });
    }
    else {
      var offset = 7 - (monthLen - this.state.date);
      nextItems = this.buildChildItems(lastMonthLen - (firstDay - 1), back ? 12 : this.state.month - 1 , back ? this.state.year - 1 : this.state.year);
      this.setState({
        date: lastMonthLen - (firstDay - 1),
        month: back ? 12 : this.state.month - 1 ,
        year: back ? this.state.year - 1 : this.state.year,
        childItems: nextItems,
        payload: this.state.payload
      });
    }
  }

  public searchByDate = (date, reqMonth, reqYear, item) => {
    let res = -1;
    let payload = this.state == undefined ? this.tempData : this.state.payload;
    (payload).forEach(function (event, index) {
      if ((event.date == date) && (event.year == reqYear) && (event.month == reqMonth) && (event.items[0] != item)) {
        res = index;
      }
    });
    return res;
  }

  public onEventAdd(newItem, datePicked) {
    console.log('current data:');
    console.log(this.state.payload);
    console.log('weeks-onEventAdd:');
    console.log(newItem);
    var updateChildItems = this.state.childItems;
    var cur_state = this.state;
    var matched = false;
    console.log('weeks-onEventAdd-current_state:');
    console.log(cur_state);

    this.state.childItems.forEach(function(data, index) {
      if(((cur_state.date + index) == datePicked.date) && (cur_state.month == datePicked.month) && (cur_state.year == datePicked.year)) {
        console.log('weeks-matched');
        updateChildItems[index] = updateChildItems[index].concat([newItem]);
        console.log(updateChildItems[index]);
        matched = !matched;
      }
    });

    if (matched) {
      this.setState({
        date: this.state.date,
        month: datePicked.month,
        year: datePicked.year,
        childItems: updateChildItems,
        payload: this.state.payload
      });
    }

    let index = this.searchByDate(datePicked.date, datePicked.month, datePicked.year, newItem);
    console.log('request date');
    console.log([datePicked.date, datePicked.month, datePicked.year]);
    if (index != -1) {
      console.log(this.state.payload[index]);
      console.log('-------------- change');
      this.state.payload[index].items = this.state.payload[index].items.concat([newItem]);
    } else {
      console.log('-------------- append new');
      let newObj = datePicked;
      newObj.items = [newItem];
      newObj.day = 0;
      //this.state.payload = this.state.payload.concat([newObj]);
      this.setState({
        date: this.state.date,
        month: this.state.month,
        year: this.state.year,
        childItems: this.state.childItems,
        payload: this.state.payload.concat([newObj])
      });
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
