import appStyles from './app-header.module.css';

import { 
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={`${appStyles.header} pt-4 pb-4`}>
      <nav className={appStyles.nav}>
        <a href="##" className={`${appStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}>
          <BurgerIcon type="primary" />
          <span className={`${appStyles.button_text} ${appStyles.button_text_active} ml-2 text_type_main-default`}>Конструктор</span>
        </a>
        <a href="##" className={`${appStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}>
          <ListIcon type="secondary" />
          <span className={`${appStyles.button_text} ml-2 text_type_main-default`}>Лента заказов</span>
        </a>
        <a href="##" className={appStyles.logo}>
          <Logo />
        </a>
        <a href="##" className={`${appStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}>
          <ProfileIcon type="secondary" />
          <span className={`${appStyles.button_text} ml-2 text_type_main-default`}>Личный кабинет</span>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;