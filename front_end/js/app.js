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

const store = createStore({ jobs: {}});

render (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <TopBar>
          <Route exact path='/' component={CardContainer}/>
          <Route path='/job/:jobId' component={JobDetails}/>
        </TopBar>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
