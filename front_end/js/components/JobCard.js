import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as jobActions from '../actions/jobs';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import * as constants from '../constants';

const {
  STATUS_ICONS,
  RUNNING,
  CARD_ACTION_RERUN,
  CARD_ACTION_LOGS,
  CARD_ACTION_REMOVE
} = constants;

class JobCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRerun = this.handleRerun.bind(this);
  }

  handleRerun() {
    const { jobId } = this.props.job || {};
    this.props.dispatch(jobActions.rerun(jobId));
  }

  handleRemove() {
    const { jobId } = this.props.job || {};
    this.props.dispatch(jobActions.remove(jobId));
  }

  render() {
    const { jobId, status, name, lastTask, startTime, endTime } = this.props.job || {};
    const currentTime = (status === RUNNING) ? new Date() : endTime;
    return (
      <Card style={{width: '30vw', marginTop: '10px'}}>
        <CardTitle
          avatar={STATUS_ICONS[status]}
          title={name}
          subtitle={status}
          className={(status === RUNNING) ? 'spinner' : ''}
        />
        <CardTitle subtitle="Current Task" />
        <CardText>{lastTask}</CardText>
        <CardTitle subtitle="Elapsed Time" />
        <CardText>{moment(currentTime).diff(startTime, 'seconds')}</CardText>
        <CardActions>
          <Button label={CARD_ACTION_RERUN} icon='autorenew' onClick={this.handleRerun} raised primary />
          <Button label={CARD_ACTION_REMOVE} icon='highlight_off' onClick={this.handleRemove} raised accent />
          <Link to={`/job/${jobId}`}><Button icon='info_outline' label={CARD_ACTION_LOGS} raised /></Link>
        </CardActions>
      </Card>
    );
  }
};

const mapStateToProps = (state/*, props*/) => ({});
const ConnectedJobCard = connect(mapStateToProps)(JobCard);
export default ConnectedJobCard;
