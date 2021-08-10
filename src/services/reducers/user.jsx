import {
  IS_REQUESTING,
  IS_FAILED,
  IS_SUCCESSFUL
} from '../actions/user';
import { getCookie } from '../cookies';

const initialState = {
  isRequesting: false,
  isFailed: false,
  isAuth: !!getCookie('accessToken')
};

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case IS_REQUESTING: {
      return {
        ...state,
        isRequesting: true,
        isFailed: false
      }
    }
    case IS_FAILED: {
      return {
        ...state,
        isRequesting: false,
        isFailed: true
      }
    }
    case IS_SUCCESSFUL: {
      return {
        ...state,
        isRequesting: false,
        isAuth: action.isAuth
      }
    }
    default: {
      return state;
    }
  }
};