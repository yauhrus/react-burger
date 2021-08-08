import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginning } from '../../services/actions/user';
import styles from './login.module.css';

function Login() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(store => store.user);
  const { state } = useLocation();

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const onChangeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onLogging = (e) => {
    e.preventDefault();
    dispatch(loginning({ ...formData }));
  }

  if (isAuth) {
    return (
      <Redirect to={state?.from || "/"}/>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={`${styles.title} text_type_main-medium mb-6`}>Вход</h1>
        <form 
          id="login-form" 
          className={`${styles.form} mb-20`}
          onSubmit={onLogging}
        >
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={onChangeFormData}
            value={formData.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={onChangeFormData}
            value={formData.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div className={`${styles.logging} mb-4`}>
          <span className="text_type_main-default">Вы — новый пользователь?</span>
          <Link to="/register" className={`${styles.link} ml-2 text_type_main-default`}>Зарегистироваться</Link>
        </div>
        <div className={styles.logging}>
          <span className="text_type_main-default">Забыли пароль?</span>
          <Link to="/forgot-password" className={`${styles.link} ml-2 text_type_main-default`}>Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;