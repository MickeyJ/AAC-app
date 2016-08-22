import React, {Component} from 'react'
import {render} from 'react-dom'
import 'react-fastclick';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import promise from 'redux-promise'
import reducers from './redux/reducers'

import './scss/main.scss'

import Routes from './routes'

let storeWithMiddleware;

if(process.env.NODE_ENV === 'development'){

  storeWithMiddleware = applyMiddleware(
    logger(), promise
  )(createStore);

} else {

  storeWithMiddleware = applyMiddleware(
    promise
  )(createStore);

}

render(
  <Provider store={storeWithMiddleware(reducers)}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);