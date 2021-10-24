import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/hooks';
import styles from './orders.module.css';
import OrderList from '../../components/order-list/order-list';
import { wsConnectionStart } from '../../services/actions/ws';
import { RootState } from '../../services/types';
import { TOrder } from '../../services/types/data';

interface IOrderNumbers {
  done: number[];
  pending: number[];
}

const Orders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store: RootState | any) => store.orders);
  const ordersResponse = orders.orders.orders || [];
  const orderList =  ordersResponse || [];

  const ordersNumbers: IOrderNumbers = {
    done: [],
    pending: []
  };

  orderList.forEach((item: TOrder) => {
    if (item.status === 'done' || item.status === 'pending') {
      ordersNumbers[item.status].push(item.number);
    }
  });

  useEffect(() => {
    if(!orders.wsConnected) {
      dispatch(wsConnectionStart());
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

export default Orders;