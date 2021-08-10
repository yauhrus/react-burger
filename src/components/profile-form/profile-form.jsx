import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserInfo, updateUserInfo } from '../../services/actions/user';
import styles from './profile-form.module.css';

function ProfileForm() {
  const dispatch = useDispatch();
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

  const onSaveChanges = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(formData));
  }

  useEffect(() => {
    let mounted = true;

    if(mounted) {
      dispatch(getUserInfo(formData, setFormData));
    }

    return () => mounted = false;
    
    // eslint-disable-next-line
  }, []);

  const onCancel = (e) => {
    e.preventDefault();
    dispatch(getUserInfo(formData, setFormData));
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