import * as DatePickerLib from 'react-bootstrap-date-picker';
import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';

/* Extract elements from date-picker */
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var HelpBlock = ReactBootstrap.HelpBlock;
var DatePicker = DatePickerLib;

interface State {
  value: String
  formattedValue: any
}

interface Props{
  onChange: any
}

export class DatePick extends React.Component<Props,State>{

  constructor() {
    super();
    this.state = ({value: new Date().toISOString(), formattedValue:0});
  }

  public handleChange(value, formattedValue) {
    this.props.onChange(formattedValue);
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    });
  }

  public render() {
    return (<FormGroup>
      <ControlLabel>Date:</ControlLabel>
      <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange.bind(this)} />
      <HelpBlock>Event</HelpBlock>
    </FormGroup>);
  }
};
