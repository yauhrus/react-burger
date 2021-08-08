import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './registration.module.css';
import { register } from '../../services/actions/user';

function Registration() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(store => store.user);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeFormData = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onRegistration = (e) => {
    e.preventDefault();
    dispatch(register({ ...formData }));
  }

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={`${styles.title} text_type_main-medium mb-6`}>Регистрация</h1>
        <form 
          id="registration-form" 
          className={`${styles.form} mb-20`}
          onSubmit={onRegistration}
        >
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChangeFormData}
            value={formData.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
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
            Зарегистироваться
          </Button>
        </form>
        <div className={styles.logging}>
          <span className="text_type_main-default">Уже зарегистированы?</span>
          <Link to="/login" className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </div>
  )
};

export default Registration;