import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from '../constants';

import { TOrder } from '../types/data';
import { TWsActions } from '../actions/ws';

type TWsState = {
  wsConnected: boolean;
  orders: TOrder[];
}

const initialState: TWsState = {
  wsConnected: false,
  orders: []
};

export const wsReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state
      }
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true
      }
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false
      }
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false
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