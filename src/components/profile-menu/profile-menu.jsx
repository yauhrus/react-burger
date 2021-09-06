import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loggingOut } from '../../services/actions/user';
import styles from './profile-menu.module.css';

function ProfileMenu() {
  const dispatch = useDispatch();

  const onLoggingOut = () => {
    dispatch(loggingOut());
  };

  return (
    <div className={`${styles.tabs} ml-4 mr-15`}>
      <NavLink 
        to="/profile" 
        exact={true}
        className={`${styles.link} text_type_main-medium`}
        activeStyle={{ color: "#FFFFFF" }}
      >
        Профиль
      </NavLink>
      <NavLink 
        to="/profile/orders"
        exact={true}
        className={`${styles.link} text_type_main-medium`}
        activeStyle={{ color: "#FFFFFF" }}
      >
        История заказов
      </NavLink>
      <button to="" className={`${styles.link} text_type_main-medium`} onClick={onLoggingOut}>
        Выход
      </button>
      <p className={`${styles.description} text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  )
}

export default ProfileMenu;