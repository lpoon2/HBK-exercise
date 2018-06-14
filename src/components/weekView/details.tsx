import * as React from 'react';
import { DateCell } from '../../model/date';
import { Notification } from '../notification';
import { calendarAPI } from '../../api/calendar/index';
import { weekAPI } from '../../api/calendar/week';

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

  public getItems() {
    return this.props.items;
  }

  public generateKey() {
    this.index = this.index + 1;
    return  this.index+ "-" + this.props.date + "-" + this.props.month + "-" + this.props.year;
  }

  public itemRow = (items: String) => {
    return (
      <li key={this.generateKey()} className="list-group-item" onClick={(e)=>weekAPI.hideEle(e)}>
        {items}  <button id={this.index.toString()} className="btn-danger delete-btn" onClick={(e)=>weekAPI.hideEle(e)}>x</button>
      </li>
    )
  }

  public render() {
    return (
          <div className="col-lg-1">
            {weekAPI.getDayName(this.props.date, this.props.month, this.props.year)}
            <span className="pull-right"></span>
            <p>{this.props.date}</p>
            <ul className="list-group">
              {this.getItems().map(this.itemRow)}
            </ul>
          </div>
    );
  }
}
