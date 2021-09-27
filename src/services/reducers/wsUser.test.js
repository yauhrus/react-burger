import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_MESSAGE
} from '../actions/wsUser';
import { wsUserReducer } from './wsUser';

const initialState = {
  wsConnected: false,
  orders: {}
};

const initialStateConnected = {
  wsConnected: true,
  orders: {}
};

describe('Проверка редьюсера wsUser', () => {
  it('Проверка начального состояния', () => {
    expect(wsUserReducer(undefined, {type: 'test'})).toEqual(initialState);
  })
  it('Проверка редьюсера. WS_USER_CONNECTION_START', () => {
    expect(wsUserReducer(initialState, { type: WS_USER_CONNECTION_START })).toEqual({
      ...initialState
    })
  })
  it('Проверка редьюсера. WS_USER_CONNECTION_SUCCESS', () => {
    expect(wsUserReducer(initialState, { type: WS_USER_CONNECTION_SUCCESS })).toEqual({
      wsConnected: true,
      ...initialState
    })
  })
  it('Проверка редьюсера. WS_USER_CONNECTION_CLOSED', () => {
    expect(wsUserReducer(initialStateConnected, { type: WS_USER_CONNECTION_CLOSED })).toEqual({
      wsConnected: false,
      ...initialStateConnected
    })
  })
  it('Проверка редьюсера. WS_USER_CONNECTION_ERROR', () => {
    expect(wsUserReducer(initialStateConnected, { type: WS_USER_CONNECTION_ERROR })).toEqual({
      wsConnected: false,
      ...initialStateConnected
    })
  })
  it('Проверка редьюсера. WS_USER_GET_MESSAGE', () => {
    const mockOrders = {
      orders: [
        {id: '22'}, 
        {id: '15'}
      ], 
      total: 515
    };
    expect(wsUserReducer(initialStateConnected, { type: WS_USER_GET_MESSAGE, orders: mockOrders.orders})).toEqual({
      ...initialStateConnected,
      orders: mockOrders.orders
    })
  })
});