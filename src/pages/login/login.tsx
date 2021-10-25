import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginning } from '../../services/actions/user';
import styles from './login.module.css';
import { RootState } from '../../services/types';

interface IUseLocation {
  from: string;
}

interface IUseState {
  email: string;
  password: string;
}

const Login: FC = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store: RootState) => store.user);
  const { state } = useLocation<IUseLocation>();

  const [formData, setFormData] = useState<IUseState>({
    email: '',
    password: ''
  });

  const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onLogging = (e: React.FormEvent<HTMLFormElement>) => {
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
          onSubmit={(e) => onLogging(e)}
        >
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => onChangeFormData(e)}
            value={formData.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={(e) => onChangeFormData(e)}
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