import * as React from 'react';
import { DateCell } from '../../model/date';
import { Notification } from '../notification';
import { calendarAPI } from '../../api/calendar/index';

const dayNames =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface State {
  items: String[];
}

interface Props {
  date: number;
  month: number;
  year: number;
  items: String[];
}

export class Details extends React.Component<Props,State>{

  constructor() {
    super();
    this.state = {items: []};
  }

  public index = 0;

  public getDayName() {
    var date = new Date(this.props.year, this.props.month-2, this.props.date);
    return dayNames[date.getDay()];
  }

  public getItems() {
    return this.props.items;
  }

  public getDate(date,len) {
    var remainder = (date) % len;
    return remainder == 0? len : remainder;
  }

  public generateKey() {
    this.index = this.index + 1;
    return  this.index+ "-" + this.props.date + "-" + this.props.month + "-" + this.props.year;
  }

  public hideEle(e) {
    let elem = document.getElementById(e.target.id).parentElement;
    elem.style.display = "none";
  }

  public itemRow = (items: String) => {
    return (
      <li key={this.generateKey()} className="list-group-item" onClick={(e)=>this.hideEle(e)}>
        {items}  <button id={this.generateKey()} className="btn-danger delete-btn" onClick={(e)=>this.hideEle(e)}>x</button>
      </li>
    )
  }

  public render() {
    return (
          <div className="col-lg-1">
            {this.getDayName()}
            <span className="pull-right"></span>
            <p>{this.props.date}</p>
            <ul className="list-group">
              {this.getItems().map(this.itemRow)}
            </ul>
          </div>
    );
  }
}
