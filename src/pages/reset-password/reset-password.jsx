import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, Link, Redirect } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';

function ResetPassword() {
  const { isAuth } = useSelector(store => store.user);
  const history = useHistory();
  const location = useLocation();
  const [token, setToken] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChangePassword = (e) => {
    e.preventDefault();

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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(res => {
        if (res.success) {
          history.replace("/login")
        }
      })
    .catch(err => {
      return Promise.reject(`Ошибка ${err}`);
    })
  }

  if (isAuth) {
    return (
      <Redirect to={"/"}/>
    );
  }

  if (!location.state || (location.state && location.state.from.pathname !== '/forgot-password')) {
    return (
      <Redirect to={"/forgot-password"}/>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={`${styles.title} text_type_main-medium mb-6`}>Восстановление пароля</h1>
        <form 
          id="forgot-password-form" 
          className={`${styles.form} mb-20`}
          onSubmit={onChangePassword}
        >
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={e => setPassword(e.target.value)}
            value={password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => setToken(e.target.value)}
            value={token}
            name={'code'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <div className={styles.logging}>
          <span className="text_type_main-default">Вспомнили пароль?</span>
          <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;