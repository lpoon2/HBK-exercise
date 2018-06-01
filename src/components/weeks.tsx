import * as React from 'react';

export const Week: React.StatelessComponent<{}> = () => {
  return (
    <div className="container">
      <div className ="row">
        <div className ="col-lg-1">
          Monday
          <span className="pull-right">29</span>
        </div>
        <div className="col-lg-1">
          Tuesday
          <span className="pull-right">29</span>
        </div>
        <div className="col-lg-1">
          Wednesday
          <span className="pull-right">29</span>
        </div>
        <div className="col-lg-1">
          Thursday
          <span className="pull-right">29</span>
        </div>
        <div className="col-lg-1">
          Friday
          <span className="pull-right">29</span>
        </div>
        <div className="col-lg-1">
          Saturday
          <span className="pull-right">29</span>
        </div>
        <div className="col-lg-1">
          Sunday
          <span className="pull-right">29</span>
        </div>
      </div>
    </div>
  );
}
