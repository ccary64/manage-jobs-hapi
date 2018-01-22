import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as jobActions from './actions/jobs';
import createStore from './store'
import CardContainer from './components/CardContainer';
import TopBar from './components/TopBar';
import JobDetails from './components/JobDetails';

const cards = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '98vw'
}

const store = createStore({ jobs: {}});
store.dispatch(jobActions.fetchAll());

setInterval(async () => {
  store.dispatch(jobActions.fetchAll());
}, 1000);

render (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <TopBar>
          <Route exact path='/' component={CardContainer}/>
          <Route path='/:jobId' component={JobDetails}/>
        </TopBar>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
