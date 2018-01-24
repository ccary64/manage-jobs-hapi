import React from 'react';
import { connect } from 'react-redux'
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import * as jobActions from '../actions/jobs';
import CreateJob from './CreateJob';
import LockQueue from './LockQueue';

class TopBar extends React.Component {
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

const mapStateToProps = (state/*, props*/) => ({ currentUpdater: state.jobs.currentUpdater });
const ConnectedTopBar = connect(mapStateToProps)(TopBar);
export default ConnectedTopBar;