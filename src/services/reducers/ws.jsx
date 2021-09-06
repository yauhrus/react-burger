import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from '../actions/ws';

const initialState = {
  wsConnected: false,
  orders: {}
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state
      }
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        wsConnected: true,
        ...state
      }
    }
    case WS_CONNECTION_CLOSED: {
      return {
        wsConnected: false,
        ...state
      }
    }
    case WS_CONNECTION_ERROR: {
      return {
        wsConnected: false,
        ...state
      }
    }
    case WS_GET_MESSAGE: {
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