import React from 'react';
import { connect } from 'react-redux'
import * as jobActions from '../actions/jobs';
import * as constants from '../constants';
import moment from 'moment';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

const { STATUS_ICONS, RUNNING, COMPLETE } = constants;

class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    const { jobId } = this.props.match.params || {};
    this.props.dispatch(jobActions.fetchById(jobId));
  }

  render() {
    const { details = [] , name } = this.props;
    return (
      <List selectable>
        <ListSubHeader caption={name} />
        {details.map(item => {
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

const mapStateToProps = (state/*, props*/) => state.jobs.currentJob || {};
const ConnectedJobDetails = connect(mapStateToProps)(JobDetails);
export default ConnectedJobDetails;