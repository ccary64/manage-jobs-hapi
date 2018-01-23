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
  const { list = [] } = state;
  switch (type) {
    case FETCH_JOBS_REQUEST:
    case FETCH_JOB_BY_ID_REQUEST:
    case CREATE_JOB_REQUEST:
    case LOCK_QUEUE_REQUEST:
    case REMOVE_JOB_REQUEST:
    case REMOVE_JOB_SUCCESS:
    case FETCH_JOB_BY_ID_REQUEST:
      return {
        ...state,
        fetching: type
      };
    case REMOVE_JOB_FAILURE:
    case FETCH_JOBS_FAILURE:
    case FETCH_JOB_BY_ID_FAILURE:
    case CREATE_JOB_FAILURE:
    case LOCK_QUEUE_FAILURE:
    case REMOVE_JOB_FAILURE:
      return {
        ...state,
        fetching: false
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        list: payload.jobs || [],
        locked: payload.locked || state.locked || false,
        fetching: false
      };
    case FETCH_JOB_BY_ID_SUCCESS:
      return {
        ...state,
        currentJob: {
          id: parseInt(paylaod.jobId, /* radix */ 10),
          builds: payload.details || []
        },
        fetching: false
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        list: [ payload.job, ...list ],
        fetching: false
      };
    case LOCK_QUEUE_SUCCESS:
      return {
        ...state,
        locked: payload.locked || false,
        fetching: false
      };
    case SET_SELECTED_JOBS:
      return {
        ...state,
        selected: payload.selected || 'all'
      }
    default:
      return state;
  }
};