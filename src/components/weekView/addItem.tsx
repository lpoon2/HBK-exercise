import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { DatePick } from './addDate';
import { dates } from '../../api/data/mockData'
import { DateCell } from '../../model/date';
import { calendarAPI } from '../../api/calendar/index';
import { WeekDetail } from './weeks'

/* Extract elements from react-bootstrap*/
var Popover = ReactBootstrap.Popover;
var Tooltip = ReactBootstrap.Tooltip;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;
var HelpBlock = ReactBootstrap.HelpBlock;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;

interface Props {
  date: number;
  month: number;
  year: number;
  onEventAdd: any;
}

interface State {
  show: Boolean;
  saveItem: DateCell;
  event: String;
  date: any;
}

export class AddItem extends React.Component<Props,State> {
  public tempData = calendarAPI.getDates();
  constructor() {
    super();
    var d: DateCell = {
      date: 1,
      year: 2000,
      month: 1,
      day: 0, /*Sunday is 0, Saturday is 6 etc*/
      items: []
    };
    this.state = {show: false, saveItem: d , event: '', date: {}};
  }

  public currentPick = {};
  public event = '';
  public getDatePick(date) {
    var outputDate = date.split('/');
    var updateSavedItem = this.state.saveItem;
    updateSavedItem.month = parseInt(outputDate[0]);
    updateSavedItem.date = parseInt(outputDate[1]);
    updateSavedItem.year = parseInt(outputDate[2]);
    this.currentPick = updateSavedItem;
    this.setState({show: this.state.show, saveItem: this.state.saveItem, event: this.state.event, date: {}});
  }

  public addEvent() {
    var oldItem = this.state.saveItem.items;
    var newItem = [this.state.event];
    var datePicked = this.state.date;
    var prevObj = this.state.saveItem;
    prevObj.items = newItem;
    this.handleClose();
    this.props.onEventAdd(this.event, this.currentPick);
  }

  public handleClose() {
    this.setState({show: false, saveItem: this.state.saveItem, event: '', date: this.state.date});
  }

  public handleShow() {
    this.setState({ show: true, saveItem: this.state.saveItem, event: this.state.event, date: this.state.date});
  }

  public handleChange(e) {
    this.event = e.target.value;
    this.setState({ show: true, saveItem: this.state.saveItem, event: e.target.value, date: this.state.date});
  }

  public render() {

      return (
        <div>
          <Button id="add-button" bsStyle="primary" bsSize="large" onClick={this.handleShow.bind(this)}>
            + Add Event
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Creating New Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DatePick onChange={this.getDatePick.bind(this)}/>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Working example with validation</ControlLabel>
                <FormControl type="text" value={this.state.event} placeholder="Enter text" onChange={this.handleChange.bind(this)}/>
                <FormControl.Feedback />
                <HelpBlock>Add event to this date.</HelpBlock>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.addEvent.bind(this)}>Save</Button>
              <Button onClick={this.handleClose.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
}
