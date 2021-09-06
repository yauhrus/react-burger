import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams, matchPath} from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from '../../services/actions';
import { WS_CONNECTION_START } from '../../services/actions/ws';
import { WS_USER_CONNECTION_START } from '../../services/actions/wsUser';
import dataConverter from '../../utils/dataConverter';
import styles from './order-info.module.css';
import cx from 'classnames';

export default function OrderInfo({ className }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const ordersAll = useSelector(store => store.orders);
  const ordersUser = useSelector(store => store.userOrders);
  const ingredients = useSelector(store => store.burger.ingredients);
  let { orderId } = useParams();

  if (!orderId) { 
    orderId = matchPath(location.pathname, {
      path: '/profile/orders/:orderId',
      exact: true,
      strict: false
    }).params.orderId;
  }

  const orders = location.pathname.indexOf('profile') >= 0 ? ordersUser.orders : ordersAll.orders.orders;

  useEffect(() => {
    if (Object.keys(ingredients).length === 0) {
      dispatch(getIngredients());
    }
    if (!orders || Object.keys(orders).length === 0) {
      if (location.pathname.indexOf('profile') >= 0) {
        dispatch({ type: WS_USER_CONNECTION_START });
      } else {
        dispatch({ type: WS_CONNECTION_START });
      }
    }
  }, [dispatch, ingredients, orders, location.pathname]);

  if ((!orders || Object.keys(orders).length === 0) || !ingredients) {
    return (
      <div className={styles.wrapper}>
        <span className={'text text_type_main-large'}>
          Loading...
        </span>
      </div>
    );
  }
  
  const order = orders.orders ? orders.orders.find(item => item._id === orderId) : orders.find(item => item._id === orderId);
  const ingredientsObj = {};

  order.ingredients?.forEach(ingredient => {
    if (ingredientsObj[ingredient]) {
      ingredientsObj[ingredient].qty += 1;
    } else {
      ingredientsObj[ingredient] = {qty: 1};
    }
  });
  let total = 0;

  for (const ingredient in ingredientsObj) {
    const { name, image_mobile, price } = ingredients.find(item => item._id === ingredient);
    ingredientsObj[ingredient].name = name;
    ingredientsObj[ingredient].img = image_mobile;
    ingredientsObj[ingredient].price = price;
    total += price * ingredientsObj[ingredient].qty;
  }

  const ingredientsObjLayout = (composition) => {
    const array = [];
    for (const ingredient in composition) {
      array.push((
        <li key={ingredient} className={styles.ingredient_info}>
          <div className={styles.ingredient_icon_name}>
            <img
              className={`${styles.ingredient_icon} mr-4`}
              src={composition[ingredient].img}
              alt=""
            />
            <span className={`text text_type_main-default`}>{composition[ingredient].name}</span>
          </div>
          <div className={styles.ingredient_qty_price}>
            <span className={'text text_type_digits-default'}>{composition[ingredient].qty}</span>
            <span className={'text text_type_main-default mr-2 ml-2'}>x</span>
            <span className={'text text_type_digits-default mr-2'}>{composition[ingredient].price}</span>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
      ))
    }
    return array;
  }

  const statusValue = (status) => {
    const style = {};
    let text = '';

    switch (status) {
      case 'created':
        text = 'Создан';
        break;
      case 'pending':
        text = 'Готовится';
        break;
      case 'done':
        text = 'Выполнен';
        style.color = '#00CCCC';
        break;
      default:
    }

    return (
      <p className={`${styles.status} text text_type_main-default mb-6`} style={style}>{text}</p>
    );
  }

  return (
    <>
    {
      order && (
        <div className={cx(styles.wrapper, className)}>
          <p className={`text text_type_digits-default mb-10 ${styles.align_center}`}>#{order.number}</p>
          <p className={'text text_type_main-medium mb-3'}>{order.name}</p>
          {statusValue(order.status)}
          <p className={'text text_type_main-medium mb-6'}>Состав:</p>
          <ul className={`${styles.composition} mb-10 pr-6`}>
            {ingredientsObjLayout(ingredientsObj)}
          </ul>
          <div className={styles.time_total}>
            <span
              className="text text_type_main-default text_color_inactive">{dataConverter(new Date(order.createdAt))}</span>
            <div className={styles.total}><span className={'text text_type_digits-default mr-2'}>{total}</span><CurrencyIcon
              type="primary"/></div>
          </div>
        </div>
      )
    }
    </>
  );
}

OrderInfo.propTypes = {
  className: PropTypes.string
}