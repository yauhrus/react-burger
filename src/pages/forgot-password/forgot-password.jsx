import React from 'react';
import { useHistory, useLocation, Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';

function ForgotPassword() {
  const { isAuth } = useSelector(store => store.user);
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = React.useState('');

  const onEmailConfirm = (e) => {
    e.preventDefault();

    fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
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
          console.log(res);
          history.push("/reset-password", { from: location });
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

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={`${styles.title} text_type_main-medium mb-6`}>Восстановление пароля</h1>
        <form 
          id="forgot-password-form" 
          className={`${styles.form} mb-20`}
          onSubmit={onEmailConfirm}
        >
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <div className={styles.logging}>
          <span className="text_type_main-default">Вспомнили пароль?</span>
          <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;