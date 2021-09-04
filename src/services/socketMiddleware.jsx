import { getCookie } from './cookies';

export const socketMiddleware = ( wsUrl, actions, { checkToken } = {}) => {

  return store => {
    let socket = null;

    const { 
      WS_CONNECTION_START, 
      WS_CONNECTION_SUCCESS,
      WS_CONNECTION_CLOSED, 
      WS_CONNECTION_ERROR,
      WS_GET_MESSAGE } = actions;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}${checkToken ? ('?token=' + getCookie('accessToken').slice(7)) : ''}`);
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