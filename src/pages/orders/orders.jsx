import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './orders.module.css';
import OrderList from '../../components/order-list/order-list';
import { WS_CONNECTION_START } from '../../services/actions/ws';

export function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(store => store.orders);
  const ordersResponse = orders.orders.orders || [];
  const orderList =  ordersResponse || [];

  const ordersNumbers = {
    done: [],
    pending: []
  };

  orderList.forEach(item => {
    if (item.status === 'done' || item.status === 'pending') {
      ordersNumbers[item.status].push(item.number);
    }
  });

  useEffect(() => {
    if(!orders.wsConnected) {
      dispatch({ type: WS_CONNECTION_START });
    }
  }, [dispatch, orders.wsConnected]);
  
  return (
    <section className={styles.root}>
      <h1 className={`${styles.title} text_type_main-large mb-5`}>Лента заказов</h1>
      <div className={styles.mainContainer}>
        <OrderList orderList={ordersResponse || []} showStatus={false}/>
        <div className={`${styles.info} ml-15`}>
          <div className={`${styles.statusContainer} mb-15`}>
            <div className={`${styles.status} mr-9`}>
              <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
              <ul className={styles.list}>
                {ordersNumbers && ordersNumbers.done.map(order => (
                  <li 
                    className={`text text_type_digits-default ${styles.done}`}
                    key={order}
                  >
                    {order}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.status}>
              <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
              <ul className={styles.list}>
                {ordersNumbers && ordersNumbers.pending.map(order => (
                  <li 
                    className={`text text_type_digits-default ${styles.pending}`}
                    key={order}
                  >
                    {order}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={`text text_type_main-medium ${styles.textShadow}`}>Выполнено за все время:</p>
          <p className={`text text_type_digits-large mb-15 ${styles.textShadow}`}>{orders.orders.total}</p>
          <p className={`text text_type_main-medium ${styles.textShadow}`}>Выполнено за сегодня:</p>
          <p className={`text text_type_digits-large ${styles.textShadow}`}>{orders.orders.totalToday}</p>
        </div>
      </div>
    </section>
  )
}
