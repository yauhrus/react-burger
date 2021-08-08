import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './app-header.module.css';

function AppHeader() {

  return (
    <header className={`${appStyles.header} pt-4 pb-4`}>
      <nav className={appStyles.nav}>
        <NavLink to="/" exact={true} className={`${appStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}>
          <BurgerIcon type="primary" />
          <span className={`${appStyles.button_text} ${appStyles.button_text_active} ml-2 text_type_main-default`}>Конструктор</span>
        </NavLink>
        <NavLink to="/" exact={true} className={`${appStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}>
          <ListIcon type="secondary" />
          <span className={`${appStyles.button_text} ml-2 text_type_main-default`}>Лента заказов</span>
        </NavLink>
        <Link to="/" className={appStyles.logo}>
          <Logo />
        </Link>
        <NavLink to="/profile" className={`${appStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}>
          <ProfileIcon type="secondary" />
          <span className={`${appStyles.button_text} ml-2 text_type_main-default`}>Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;