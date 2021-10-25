import { Middleware } from 'redux';
import { getCookie } from './cookies';

type WsActions = {
	WS_CONNECTION_START: string,
  WS_CONNECTION_SUCCESS: string,
  WS_CONNECTION_CLOSED: string, 
  WS_CONNECTION_ERROR: string,
  WS_GET_MESSAGE: string
};

export const socketMiddleware = ( wsUrl: string, actions: WsActions, {checkToken}: {checkToken?: boolean}): Middleware => {


  return store => {
    let socket: WebSocket | null = null;

    const { 
      WS_CONNECTION_START, 
      WS_CONNECTION_SUCCESS,
      WS_CONNECTION_CLOSED, 
      WS_CONNECTION_ERROR,
      WS_GET_MESSAGE } = actions;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const token = getCookie('accessToken');

      if (type === WS_CONNECTION_START) {
        if(checkToken && token) {
          socket = new WebSocket(`${wsUrl}${'?token=' + token.slice(7)}`);
        } 
        else {
          socket = new WebSocket(`${wsUrl}`);
        }
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS });
        };

        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: WS_GET_MESSAGE, orders: restParsedData })
        };

        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED });
        };
      }

      next(action);
    };
  };
};