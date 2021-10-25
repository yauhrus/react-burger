import  React, { FC, useState, useEffect } from 'react';
import { useDispatch } from '../../services/hooks';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserInfo, updateUserInfo } from '../../services/actions/user';
import styles from './profile-form.module.css';
import { TUser } from '../../services/types/data';

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<TUser>({
    name: '',
    email: '',
    password: ''
  });

  const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserInfo(formData));
  }

  useEffect(() => {
    
    let mounted = true;

    if(mounted) {
      dispatch(getUserInfo(formData, setFormData));
    }

    return () => {
      mounted = false;
    }
    
    // eslint-disable-next-line
  }, []);

  const onCancel = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(getUserInfo(formData, setFormData));
  };

  return (
    <form 
      id="profile-form" 
      className={styles.form}
      onSubmit={(e) => onSaveChanges(e)}
    >
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={(e) => onChangeFormData(e)}
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
        onChange={(e) => onChangeFormData(e)}
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
        onChange={(e) => onChangeFormData(e)}
        icon={'EditIcon'}
        value={formData.password || ''}
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
          onClick={(e) => onCancel(e)}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;