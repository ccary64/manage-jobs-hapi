'use strict';

import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_JOB_BY_ID_REQUEST,
  FETCH_JOB_BY_ID_SUCCESS,
  FETCH_JOB_BY_ID_FAILURE,
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
  REMOVE_JOB_REQUEST,
  REMOVE_JOB_SUCCESS,
  REMOVE_JOB_FAILURE,
  LOCK_QUEUE_REQUEST,
  LOCK_QUEUE_SUCCESS,
  LOCK_QUEUE_FAILURE,
  SET_SELECTED_JOBS
} from '../actions/actionTypes'; 

export default (state = {}, action = {}) => {
  const { payload = {}, type } = action;
  const { jobs = [], jobId, details = [], job = {}, locked = false, selected = 'all' } = payload;
  const { list = [] } = state;
  switch (type) {
    case FETCH_JOBS_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        list: jobs,
        locked,
        fetching: false
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        fetching: false
      };
    case FETCH_JOB_BY_ID_REQUEST:
      return {
        ...state,
        currentJob: {},
        fetching: true
      };
    case FETCH_JOB_BY_ID_SUCCESS:
      const currentJobId = parseInt(jobId, /* radix */ 10);
      const [currentJob] = list.filter(item => item.jobId === currentJobId);
      return {
        ...state,
        currentJob: Object.assign(currentJob,  { details }),
        fetching: false
      };
    case FETCH_JOB_BY_ID_FAILURE:
      return {
        ...state,
        fetching: false
      };
    case CREATE_JOB_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        list: [ job, ...list ],
        fetching: false
      };
    case CREATE_JOB_FAILURE:
      return {
        ...state,
        fetching: false
      };
    case LOCK_QUEUE_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case LOCK_QUEUE_SUCCESS:
      return {
        ...state,
        locked,
        fetching: false
      };
    case LOCK_QUEUE_FAILURE:
      return {
        ...state,
        fetching: false
      };
    case SET_SELECTED_JOBS:
      return {
        ...state,
        selected
      }
    case REMOVE_JOB_REQUEST:
    return {
      ...state,
      fetching: true
    };
    case REMOVE_JOB_SUCCESS:
      return {
        ...state,
        fetching: false
      };
    case REMOVE_JOB_FAILURE:
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
  }
};