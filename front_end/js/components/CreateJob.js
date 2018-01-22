import React from 'react';
import { connect } from 'react-redux'
import * as jobActions from '../actions/jobs';
import * as constants from '../constants';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

const { START_JOB, CANCEL_JOB, VALIDATION_ERROR } = constants;

class CreateJob extends React.Component {
  constructor(props) {
    super(props);

    const { active = false, name = '', nameError = false, locked = false } = props;
    this.state = { active, name, nameError };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.actions = [
      { label: START_JOB, onClick: this.handleSave, primary: true, raised: true },
      { label: CANCEL_JOB, onClick: this.handleToggle, raised: true }
    ];
  }

  handleSave() {
    const { name } = this.state;
    if (!name.length) {
      this.setState({ ...this.state, nameError: true });
      return;
    }
    this.setState({ active: false });
    this.props.dispatch(jobActions.create({ name }));
  }

  handleToggle() {
    const { active } = this.state;
    this.setState({ ...this.state, active: !active, name: '', nameError: false });
  }

  handleChange(value, event) {
    const target = event.target
    const name = target.name;
    const nameError = `${name}Error`;
    this.setState({...this.state, [name]: value, [nameError]: false});
  };

  render() {
    const { locked } = this.props;
    const { active, nameError } = this.state;
    return (
      <Button label={'New Job'} onClick={this.handleToggle} raised disabled={locked}>
        <Dialog
          active={active} 
          title='Create New Job'
          actions={this.actions}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}>
          <Input
            error={(nameError) ? VALIDATION_ERROR : ''}
            type='text'
            label='Name'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            maxLength={16} />
        </Dialog>
      </Button>
    );
  }
}

const mapStateToProps = (state/*, props*/) => ({locked: state.jobs.locked || false });
const ConnectedCreateJob = connect(mapStateToProps)(CreateJob);
export default ConnectedCreateJob;