import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';


const middlewares = [thunk];

// if (process.env.NODE_ENV === 'development') {
//   const createLogger = require('redux-logger');
//   const logger = createLogger({ duration: true });
//   middlewares.push(logger);
// }

// const logger = createLogger();

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
