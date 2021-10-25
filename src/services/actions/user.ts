import {
  getCookie,
  setCookie,
  deleteCookie
} from '../cookies';

import { History } from 'history';

import { 
  IS_REQUESTING,
  IS_FAILED,
  IS_SUCCESSFUL 
} from '../constants';

import { AppDispatch, AppThunk } from '../types';
import { TUser } from '../types/data';

const token = getCookie('accessToken');

export interface IIsRequesting {
  readonly type: typeof IS_REQUESTING
}

export interface IIsFailed {
  readonly type: typeof IS_FAILED
}

export interface IIsSuccessful {
  readonly type: typeof IS_SUCCESSFUL
  readonly isAuth: boolean
}

export const isRequestingAction = (): IIsRequesting => ({
  type: IS_REQUESTING
})

export const isFailedAction = (): IIsFailed => ({
  type: IS_FAILED
})

export const isSuccessfulAction = (isAuth: boolean): IIsSuccessful => ({
  type: IS_SUCCESSFUL,
  isAuth: isAuth
})

export type TUserActions = 
 | IIsRequesting
 | IIsFailed
 | IIsSuccessful;

const AUTH = 'https://norma.nomoreparties.space/api/auth';

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register: AppThunk = ({ email, password, name }: TUser) => (dispatch: AppDispatch) => {
  dispatch(isRequestingAction());
  fetch(AUTH + '/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name
    })
  })
  .then(checkResponse)
  .then(res => {
    if (res.success) {
      dispatch(isSuccessfulAction(true));
      setCookie('accessToken', res.accessToken, {expires: 20 * 60});
      setCookie('refreshToken', res.refreshToken);
    } else {
      dispatch(isFailedAction());
    }
  })
  .catch(err => {
    dispatch(isFailedAction());
  })
}

export const loginning: AppThunk = ({ email, password }: TUser) => (dispatch: AppDispatch) => {
  dispatch(isRequestingAction());
  fetch(AUTH + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, 
      password
    })
  })
  .then(checkResponse)
  .then(res => {
    if (res.success) {
      dispatch(isSuccessfulAction(true));
      setCookie('accessToken', res.accessToken, {expires: 20 * 60});
      setCookie('refreshToken', res.refreshToken);
    } else {
      dispatch(isFailedAction());
    }
  })
  .catch(err => {
    dispatch(isFailedAction());
  });
}

export const loggingOut: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(isRequestingAction());
  fetch(AUTH + '/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
  .then(checkResponse)
  .then(res => {
    if (res.success) {
      dispatch(isSuccessfulAction(false));
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    } else {
      dispatch(isFailedAction());
    }
  })
  .catch(err => {
    dispatch(isFailedAction());
  });
}

export const forgotPassword: AppThunk = ( email: string , history: History, location: string ) => (dispatch: AppDispatch) => {
  dispatch(isRequestingAction());
  fetch('https://norma.nomoreparties.space/api/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email
    })
  })
  .then(checkResponse)
  .then(res => {
    if (res.success) {
      history.push("/reset-password", { from: location });
    }
    else {
      dispatch(isFailedAction());
    }
  })
  .catch(err => {
    dispatch(isFailedAction());
  })
}

export const resetPassword: AppThunk = (password: string, token: string, history: History) => (dispatch: AppDispatch) => {
  dispatch(isRequestingAction());

  fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      token
    })
  })
  .then(checkResponse)
  .then(res => {
    if (res.success) {
      history.replace("/login")
    }
    else {
      dispatch(isFailedAction());
    }
  })
  .catch(err => {
    dispatch(isFailedAction());
  })
}

export const getUserInfo: AppThunk = (formData: TUser, setFormData: Function) => (dispatch: AppDispatch) => {
  dispatch(isRequestingAction());

  if (!getCookie('accessToken')) {
    getToken();
  }

  token && fetch(AUTH + '/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
  .then(checkResponse)
  .then(res => {
    if (res.success) {
      setFormData({...formData, ...res.user});
    }
    else {
      dispatch(isFailedAction());
    }
  })
  .catch(err => {
    dispatch(isFailedAction());
  })
}

export const updateUserInfo: AppThunk = (formData: TUser) => (dispatch: AppDispatch) => {
  dispatch(isRequestingAction());

  if (!getCookie('accessToken')) {
    getToken();
  }

  token && fetch(AUTH + '/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify({...formData})
  })
  .then(checkResponse)
  .then(res => {
    if (res.success) {
      console.log('SUCCESS');
    }
    else {
      dispatch(isFailedAction());
    }
  })
  .catch(err => {
    dispatch(isFailedAction());
  })
}

export const getToken: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(isRequestingAction());
  fetch(AUTH + '/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
  .then(checkResponse)
  .then(res => {
    if (res.success) {
      setCookie('accessToken', res.accessToken, {expires: 20 * 60});
      setCookie('refreshToken', res.refreshToken);
    } else {
      dispatch(isFailedAction());
    }
  })
  .catch(err => {
    dispatch(isFailedAction());
  })
}