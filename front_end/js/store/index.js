'use strict';

import { createStore, applyMiddleware } from 'redux'
import api from '../middleware/api'
import reducers from '../reducers'

export default (data) => {
  const finalCreateStore = applyMiddleware(api)(createStore);
  const store = finalCreateStore(reducers, data);

  return store;
}