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
        <NavLink 
          to="/" 
          exact={true} 
          className={`${appStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}
          activeClassName={appStyles.button_active}
        >
          <BurgerIcon type="secondary" />
          <span className={`${appStyles.button_text} ml-2 text_type_main-default`}>Конструктор</span>
        </NavLink>
        <NavLink 
          to="/orders" 
          exact={true} 
          className={`${appStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}
          activeClassName={appStyles.button_active}
        >
          <ListIcon type="secondary" />
          <span className={`${appStyles.button_text} ml-2 text_type_main-default`}>Лента заказов</span>
        </NavLink>
        <Link to="/" className={appStyles.logo}>
          <Logo />
        </Link>
        <NavLink 
          to="/profile" 
          className={`${appStyles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}
          activeClassName={appStyles.button_active}
        >
          <ProfileIcon type="secondary" />
          <span className={`${appStyles.button_text} ml-2 text_type_main-default`}>Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;