import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-list.module.css';
import OrderItem from '../order-item/order-item';
import { getIngredients } from '../../services/actions';

export default function OrderList({ orderList, showStatus }) {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.burger.ingredients);
  const location = useLocation();

  useEffect(() => {
    if(ingredients.length === 0 ) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <>
    {
      ingredients.length ? (
        <ul className={styles.list}>
          { orderList &&
            orderList.map(item => (
              <li key={item._id}>
                <Link to={{
                  pathname: `${location.pathname}/${item._id}`,
                  state: {background: location}
                }}>
                  <OrderItem order={item} key={item._id} showStatus={showStatus}/>
                </Link>
              </li>
            ))
          }
        </ul>
      )
      : (
        <p className={'text text_type_main-large'}>Requesting data...</p>
      )
    }
    </>
  )
}

const orderPropTypes = PropTypes.shape({
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  _id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['created', 'pending', 'done']),
  number: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string
});

OrderList.propTypes = {
  orderList: PropTypes.arrayOf(orderPropTypes).isRequired,
  showStatus: PropTypes.bool.isRequired,
};

