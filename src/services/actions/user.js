import {
  getCookie,
  setCookie,
  deleteCookie
} from '../cookies';

export const IS_REQUESTING = 'IS_REQUESTING';
export const IS_FAILED = 'IS_FAILED';
export const IS_SUCCESSFUL = 'IS_SUCCESSFUL';
const AUTH = 'https://norma.nomoreparties.space/api/auth';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function register({ email, password, name }) {
  return function (dispatch) {
    dispatch({ type: IS_REQUESTING });
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

export function forgotPassword( email , history, location) {
  return function(dispatch) {
    dispatch({ type: IS_REQUESTING });
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
        dispatch({ type: IS_FAILED });
      }
    })
    .catch(err => {
      dispatch({ type: IS_FAILED });
    })
  }
}

export function resetPassword(password, token, history) {
  return function (dispatch) {
    dispatch({ type: IS_REQUESTING });

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
        dispatch({ type: IS_FAILED });
      }
    })
    .catch(err => {
      dispatch({ type: IS_FAILED });
    })
  }
}

export function getUserInfo(formData, setFormData) {
  return function(dispatch) {
    dispatch({ type: IS_REQUESTING });

    if (!getCookie('accessToken')) {
      getToken();
    }

    fetch(AUTH + '/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getCookie('accessToken')
      }
    })
    .then(checkResponse)
    .then(res => {
      if (res.success) {
        setFormData({...formData, ...res.user});
      }
      else {
        dispatch({ type: IS_FAILED });
      }
    })
    .catch(err => {
      dispatch({ type: IS_FAILED });
    })
  }
}

export function updateUserInfo(formData) {
  return function(dispatch) {
    dispatch({ type: IS_REQUESTING });

    if (!getCookie('accessToken')) {
      getToken();
    }

    fetch(AUTH + '/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getCookie('accessToken')
      },
      body: JSON.stringify({...formData})
    })
    .then(checkResponse)
    .then(res => {
      if (res.success) {
        console.log('SUCCESS');
      }
      else {
        dispatch({ type: IS_FAILED });
      }
    })
    .catch(err => {
      dispatch({ type: IS_FAILED });
    })
  }
}

export function getToken() {
  return function(dispatch) {
    dispatch({ type: IS_REQUESTING });
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
        dispatch({ type: IS_FAILED });
      }
    })
    .catch(err => {
      dispatch({ type: IS_FAILED });
    })
  }
}