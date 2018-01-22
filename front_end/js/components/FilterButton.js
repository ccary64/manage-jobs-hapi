import React from 'react';
import { connect } from 'react-redux'
import * as jobActions from '../actions/jobs';
import * as constants from '../constants';
import { Button } from 'react-toolbox/lib/button';

const { ALL } = constants;

const FilterButton = (props) => {
  const { label, selected = ALL } = props;
  const handleClick = () => props.dispatch(jobActions.setSelected(label))
  return (<Button label={label} onClick={handleClick} raised primary={(selected === label)} />);
}

const mapStateToProps = (state/*, props*/) => ({ selected: state.jobs.selected });
const ConnectedFilterButton = connect(mapStateToProps)(FilterButton);
export default ConnectedFilterButton;