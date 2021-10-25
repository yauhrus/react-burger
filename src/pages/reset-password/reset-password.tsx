import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, Link, Redirect } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { resetPassword } from '../../services/actions/user';
import { RootState } from '../../services/types';
import { Location } from 'history';

interface ILocation {
  location: Location;
  from: {
    pathname: string;
  }
}

const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store: RootState) => store.user);
  const history = useHistory();
  const location = useLocation<ILocation>();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  const onChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(password, token, history));
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
          onSubmit={(e) => onChangePassword(e)}
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