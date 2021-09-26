import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from '../actions/ws';

import { wsReducer } from './ws';

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
    expect(wsReducer(undefined, {type: 'test'})).toEqual(initialState);
  })
  it('Проверка редьюсера. WS_CONNECTION_START', () => {
    expect(wsReducer(initialState, { type: WS_CONNECTION_START })).toEqual({
      ...initialState
    })
  })
  it('Проверка редьюсера. WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(initialState, { type: WS_CONNECTION_SUCCESS })).toEqual({
      wsConnected: true,
      ...initialState
    })
  })
  it('Проверка редьюсера. WS_CONNECTION_CLOSED', () => {
    expect(wsReducer(initialStateConnected, { type: WS_CONNECTION_CLOSED })).toEqual({
      wsConnected: false,
      ...initialStateConnected
    })
  })
  it('Проверка редьюсера. WS_CONNECTION_ERROR', () => {
    expect(wsReducer(initialStateConnected, { type: WS_CONNECTION_ERROR })).toEqual({
      wsConnected: false,
      ...initialStateConnected
    })
  })
  it('Проверка редьюсера. WS_GET_MESSAGE', () => {
    const mockOrders = {
      orders: [
        {id: '2'}, 
        {id: '5'}
      ], 
      total: 333
    };
    expect(wsReducer(initialStateConnected, { type: WS_GET_MESSAGE, orders: mockOrders.orders})).toEqual({
      ...initialStateConnected,
      orders: mockOrders.orders
    })
  })
});