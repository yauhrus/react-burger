import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_MESSAGE
} from '../actions/wsUser';

const initialState = {
  wsConnected: false,
  orders: {}
};

export const wsUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_CONNECTION_START: {
      return {
        ...state
      }
    }
    case WS_USER_CONNECTION_SUCCESS: {
      return {
        wsConnected: true,
        ...state
      }
    }
    case WS_USER_CONNECTION_CLOSED: {
      return {
        wsConnected: false,
        ...state
      }
    }
    case WS_USER_CONNECTION_ERROR: {
      return {
        wsConnected: false,
        ...state
      }
    }
    case WS_USER_GET_MESSAGE: {
      return {
        ...state,
        orders: action.orders
      }
    }
    default: {
      return state;
    }
  }
}