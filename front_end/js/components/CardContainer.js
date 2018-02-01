import React from 'react';
import { connect } from 'react-redux'
import { Navigation, Snackbar, Autocomplete } from 'react-toolbox';
import FilterButton from './FilterButton';
import * as jobActions from '../actions/jobs';
import JobCard from './JobCard';

import * as constants from '../constants';

const { BUTTON_OPTIONS, ALL } = constants;

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multiple: ['spain', 'ben']
    }
    this.setFilter = this.setFilter.bind(this);
    clearInterval(this.props.currentUpdater);
    this.props.dispatch(jobActions.setUpdater(this.getUpdater));
  }

  get getUpdater() {
    this.props.dispatch(jobActions.fetchAll());
    return setInterval(() => this.props.dispatch(jobActions.fetchAll()), 1000);
  }

  setFilter() {
    const { list = [], selected = ALL } = this.props;

    if (selected === ALL) {
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
        <Snackbar
          active={this.props.locked || false}
          label='The Queue is locked'
          type='cancel'
        />
      </div>
    );
  }
}

const mapStateToProps = (state/*, props*/) => state.jobs;
const ConnectedCardContainer = connect(mapStateToProps)(CardContainer);
export default ConnectedCardContainer;