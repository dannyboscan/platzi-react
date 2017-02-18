import { createStore, applyMiddleware } from 'redux';
// import createLogger from 'redux-logger';

import reducer from './reducer';


const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger({ duration: true });
  middlewares.push(logger);
}

// const logger = createLogger();

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
