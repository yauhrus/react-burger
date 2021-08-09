import React, { useEffect } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from '../../services/cookies';
import { getToken } from '../../services/actions/user';
import styles from './profile-form.module.css';

function ProfileForm() {
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

  const getUserInfo = () => {
    if (!getCookie('accessToken')) {
      getToken();
    }

    fetch('https://norma.nomoreparties.space/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getCookie('accessToken')
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(res => {
      if (res.success) {
        setFormData({...formData, ...res.user});
      }
    })
    .catch(err => {
      return Promise.reject(`Ошибка ${err}`);
    })
  }

  const onSaveChanges = (e) => {
    e.preventDefault();

    if (!getCookie('accessToken')) {
      getToken();
    }

    fetch('https://norma.nomoreparties.space/api/auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getCookie('accessToken')
      },
      body: JSON.stringify({...formData})
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(res => {
      if (res.success) {
        console.log('SUCCESS');
      }
    })
    .catch(err => {
      return Promise.reject(`Ошибка ${err}`);
    })
  }

  useEffect(() => {
    let mounted = true;

    if(mounted) {
      getUserInfo();
    }

    return () => mounted = false;
    
    // eslint-disable-next-line
  }, []);

  const onCancel = (e) => {
    e.preventDefault();
    getUserInfo();
  };

  return (
    <form 
      id="profile-form" 
      className={styles.form}
      onSubmit={onSaveChanges}
    >
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChangeFormData}
        icon={'EditIcon'}
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
        icon={'EditIcon'}
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
        icon={'EditIcon'}
        value={formData.password}
        name={'password'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
      <div className={styles.container}>
        <Button 
          type={"primary"} 
          size={"medium"}
        >
          Сохранить
        </Button>
        <Button 
          type={"secondary"} 
          size={"medium"} 
          onClick={onCancel}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;