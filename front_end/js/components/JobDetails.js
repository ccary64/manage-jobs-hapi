import React from 'react';
import { connect } from 'react-redux'
import { CREATE_JOB_REQUEST } from '../actions/actionTypes';
import * as jobActions from '../actions/jobs';
import * as constants from '../constants';
import moment from 'moment';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

const { STATUS_ICONS, RUNNING, COMPLETE } = constants;

class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    const { jobId } = this.props.match.params || {};
    clearInterval(this.props.currentUpdater);
    this.props.dispatch(jobActions.setUpdater(this.getUpdater));
  }

  get getUpdater() {
    const { jobId } = this.props.match.params || {};
    this.props.dispatch(jobActions.fetchById(jobId));
    return setInterval(() => this.props.dispatch(jobActions.fetchById(jobId)), 1000);
  }

  shouldComponentUpdate(nextProps) {
    console.log(nextProps);
    return true;
  }

  render() {
    const { name } = this.props.currentJob;
    return (
      <List selectable>
        <ListSubHeader caption={name} />
        {this.props.currentBuilds.map(item => {
          return (
            <ListItem 
              avatar={STATUS_ICONS[item.status]}
              caption={(item.status === COMPLETE) ? item.status: `${item.status}: ${item.lastTask}`}
              className={(item.status === RUNNING) ? 'spinner' : ''}
              legend={(item.status === RUNNING) ? `Started: ${moment(item.startDate).format('llll')}` : moment(item.endDate).format('llll')}
            />
          );
        })}
      </List>
    );
  }
}

const mapStateToProps = (state/*, props*/) => {
  console.log('state', state.jobs.currentBuilds);
  return {
    currentJob: state.jobs.currentJob || {},
    currentBuilds: state.jobs.currentBuilds || [],
    currentUpdater: state.jobs.currentUpdater
  };
}
const ConnectedJobDetails = connect(mapStateToProps)(JobDetails);
export default ConnectedJobDetails;