import React from 'react';
import { connect } from 'react-redux'
import Navigation from 'react-toolbox/lib/navigation';
import FilterButton from './FilterButton';
import * as jobActions from '../actions/jobs';
import JobCard from './JobCard';

import * as constants from '../constants';

const { BUTTON_OPTIONS } = constants;

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '98vw'
}

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
    clearInterval(this.props.currentUpdater);
    this.props.dispatch(jobActions.setUpdater(this.getUpdater));
  }

  get getUpdater() {
    this.props.dispatch(jobActions.fetchAll());
    return setInterval(() => this.props.dispatch(jobActions.fetchAll()), 1000);
  }

  setFilter() {
    const { list = [], selected = 'all' } = this.props;

    if (selected === 'all') {
      return list;
    }

    return  list.filter(card => card.status === selected);
  }

  render() {
    const cards = this.setFilter()
    return (
      <div>
        <Navigation type="horizontal">
          { BUTTON_OPTIONS.map(label => <FilterButton label={label} />)}
        </Navigation>
        <div style={containerStyle}>
          {cards.map(job => <JobCard job={job} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state/*, props*/) => state.jobs;
const ConnectedCardContainer = connect(mapStateToProps)(CardContainer);
export default ConnectedCardContainer;