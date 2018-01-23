import React from 'react';
import { connect } from 'react-redux'
import * as jobActions from '../actions/jobs';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button';

class LockQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false, locked: false };
    this.handleToggleActive = this.handleToggleActive.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleToggleLock = this.handleToggleLock.bind(this);

    this.actions = [
      { label: 'Lock Queue', onClick: this.handleToggleLock, primary: true, raised: true },
      { label: 'Cancel', onClick: this.handleToggleActive, raised: true }
    ];
  }

  handleToggleLock() {
    const { locked = false } = this.props;
    this.props.dispatch(jobActions.lockQueue({ locked: !locked }));
    this.setState({ ...this.state, active: false });
  }


  handleToggleActive() {
    const { active } = this.state;
    this.setState({ ...this.state, active: !active });
  }

  handleButtonPress() {
    const { locked = false } = this.props;

    if (locked) {
      this.props.dispatch(jobActions.lockQueue({ locked: !locked }));
      return;
    }

    const { active } = this.state;
    this.setState({ ...this.state, active: !active });
  };

  render() {
    const { active } = this.state;
    const { locked = false } = this.props;
    return (
      <Button
        icon={(locked) ? 'lock_open' : 'lock_outline'}
        label={(locked) ? 'Unlock Queue' : 'Lock Queue'}
        onClick={this.handleButtonPress}
        raised
        accent={locked}>
        <Dialog
          active={active} 
          title='Are you sure you want to Lock Queue'
          actions={this.actions}
          onEscKeyDown={this.handleToggleActive}
          onOverlayClick={this.handleToggleActive}>
        </Dialog>
      </Button>
    );
  }
}

const mapStateToProps = (state/*, props*/) => ({ locked: state.jobs.locked || false });
const ConnectedLockQueue = connect(mapStateToProps)(LockQueue);
export default ConnectedLockQueue;