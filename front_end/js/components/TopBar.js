import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import CreateJob from './CreateJob';
import LockQueue from './LockQueue';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.currentUpdater = 'test';
  }

  render() {
    return (
      <div style={{width: '99vw'}}>
        <AppBar title='Jobs Admin' >
          <Navigation type="horizontal">
            <CreateJob />
            <LockQueue />
          </Navigation>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}
