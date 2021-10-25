import {
  IS_REQUESTING,
  IS_FAILED,
  IS_SUCCESSFUL,
} from '../constants';
import { userReducer } from './user';

const initialState = {
  isRequesting: false,
  isFailed: false,
  isAuth: false,
};

const initialStateRequest = {
  isRequesting: true,
  isFailed: false,
  isAuth: false
};

const initialStateSuccess = {
  isRequesting: false,
  isFailed: false,
  isAuth: true
};

describe('Проверка редьюсера userReducer', () => {
  it('Проверка начального состояния', () => {
    expect(userReducer(undefined, { type: 'test' })).toEqual(initialState);
  })
  it('Проверка редьюсера. IS_REQUESTING', () => {
    expect(userReducer(initialState, { type: IS_REQUESTING })).toEqual({
      ...initialStateRequest
    })
  })
  it('Проверка редьюсера. IS_SUCCESSFUL', () => {
    expect(userReducer(initialStateRequest, { type: IS_SUCCESSFUL, isAuth: true})).toEqual({
      ...initialStateSuccess
    })
  })
  it('Проверка редьюсера. IS_FAILED', () => {
    expect(userReducer(initialStateRequest, { type: IS_FAILED })).toEqual({
      ...initialState,
      isFailed: true,
    })
  })
});