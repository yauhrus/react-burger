import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import ProfileForm from '../../components/profile-form/profile-form';

export function Profile() {
  const { isAuth } = useSelector(store => store.user);
  
  if (!isAuth) {
    return (
      <Redirect to={"/"}/>
    );
  }

  return (
    <div className={styles.root}>
      <ProfileMenu />
      <Switch>
        <Route path="/profile" exact={true}>
          <ProfileForm />
        </Route>
        <Route path="/profile/orders" exact={true}>
          <p className={`${styles.description} text_type_main-default mt-0`}>Coming soon...</p>
        </Route>
      </Switch>
    </div>
  );
};