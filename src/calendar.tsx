import * as React from 'react';
import { Header } from './components';
import { Month } from './components/months'

export const Calendar: React.StatelessComponent<{}> = (props) => {
  return (
    <div>
      <Header />
      <Month />
    </div>
  );
}
