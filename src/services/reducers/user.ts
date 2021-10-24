import { 
  IS_REQUESTING,
  IS_FAILED,
  IS_SUCCESSFUL 
} from '../constants';

import { getCookie } from '../cookies';
import { TUserActions } from '../actions/user';

type TUserState = {
  isRequesting: boolean;
  isFailed: boolean;
  isAuth: boolean;
}

const initialState: TUserState = {
  isRequesting: false,
  isFailed: false,
  isAuth: !!getCookie('accessToken')
};

export const userReducer = (state = initialState, action: TUserActions) => {
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