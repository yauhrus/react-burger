import {
  getCookie,
  setCookie,
  deleteCookie
} from '../cookies';

export const IS_REQUESTING = 'IS_REQUESTING';
export const IS_FAILED = 'IS_FAILED';
export const IS_SUCCESSFUL = 'IS_SUCCESSFUL';

export function register({ email, password, name }) {
  return function (dispatch) {
    dispatch({ type: IS_REQUESTING });
    fetch('https://norma.nomoreparties.space/api/auth/register', {
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(res => {
      if (res.success) {
        dispatch(({ type: IS_SUCCESSFUL, isAuth: true}));
        setCookie('accessToken', res.accessToken, {expires: 20 * 60});
        setCookie('refreshToken', res.refreshToken);
      } else {
        dispatch({ type: IS_FAILED });
      }
    })
    .catch(err => {
      dispatch({ type: IS_FAILED });
    })
  }
}

export function loginning({ email, password }) {
  return function (dispatch) {
    dispatch({ type: IS_REQUESTING });
    fetch('https://norma.nomoreparties.space/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, 
        password
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(res => {
      if (res.success) {
        dispatch(({ type: IS_SUCCESSFUL, isAuth: true}));
        setCookie('accessToken', res.accessToken, {expires: 20 * 60});
        setCookie('refreshToken', res.refreshToken);
      } else {
        dispatch({ type: IS_FAILED });
      }
    })
    .catch(err => {
      dispatch({ type: IS_FAILED });
    });
  }
}

export function loggingOut() {
  return function (dispatch) {
    dispatch({ type: IS_REQUESTING });
    fetch('https://norma.nomoreparties.space/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(res => {
      if (res.success) {
        dispatch(({ type: IS_SUCCESSFUL, isAuth: false }));
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
      } else {
        dispatch({ type: IS_FAILED });
      }
    })
    .catch(err => {
      dispatch({ type: IS_FAILED });
    });
  }
}

export function getToken() {
  return function(dispatch) {
    dispatch({ type: IS_REQUESTING });
    fetch('https://norma.nomoreparties.space/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(res => {
      if (res.success) {
        setCookie('accessToken', res.accessToken, {expires: 20 * 60});
        setCookie('refreshToken', res.refreshToken);
      } else {
        dispatch({ type: IS_FAILED });
      }
    })
    .catch(err => {
      dispatch({ type: IS_FAILED });
    })
  }
}