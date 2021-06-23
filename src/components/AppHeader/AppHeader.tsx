import React from 'react';
import appStyles from './AppHeader.module.css';

import { 
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={appStyles.header}>
      <nav className={appStyles.nav}>
        <a href="/" className={appStyles.button}>
          <BurgerIcon type="primary" />
          <span className={appStyles.button_text}>Конструктор</span>
        </a>
        <a href="/" className={appStyles.button}>
          <ListIcon type="secondary" />
          <span className={appStyles.button_text} style={{ 'color': '#8585AD'}}>Лента заказов</span>
        </a>
        <a href="/" className={appStyles.logo}>
          <Logo />
        </a>
        <a href="/" className={appStyles.button}>
          <ProfileIcon type="secondary" />
          <span className={appStyles.button_text} style={{ 'color': '#8585AD'}}>Личный кабинет</span>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;