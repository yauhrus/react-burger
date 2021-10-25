import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers/rootReducer';
import { socketMiddleware } from './services/socketMiddleware';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from './services/constants';

import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_MESSAGE
} from './services/constants';

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';
const WS_USER_URL = 'wss://norma.nomoreparties.space/orders';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WS_URL, {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
}, {checkToken: false}), socketMiddleware(WS_USER_URL, {
  WS_CONNECTION_START: WS_USER_CONNECTION_START,
  WS_CONNECTION_SUCCESS: WS_USER_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED: WS_USER_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR: WS_USER_CONNECTION_ERROR,
  WS_GET_MESSAGE: WS_USER_GET_MESSAGE
},{checkToken: true})));

export const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
