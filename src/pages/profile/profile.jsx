import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import ProfileForm from '../../components/profile-form/profile-form';
import OrderList from '../../components/order-list/order-list';
import OrderInfo from '../../components/order-info/order-info';
import Modal from '../../components/modal/modal';
import { WS_USER_CONNECTION_START } from '../../services/actions/wsUser';

export function Profile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { isAuth } = useSelector(store => store.user);
  const orders = useSelector(store => store.userOrders);

  useEffect(() => {
    if(!orders.wsConnected) {
      dispatch({ type: WS_USER_CONNECTION_START });
    }
  }, [dispatch, orders.wsConnected]);

  if (!isAuth) {
    return (
      <Redirect to={"/"}/>
    );
  }

  let background = location.state;

  if (location.state) {
    background = location.state.background;
  }
  
  if (history.action !== 'PUSH') {
    background = undefined;
  }

  return (
    <div className={styles.root}>
      <Switch location={background || location}>
        <Route path={'/profile/orders/:orderId'} exact={true}>
          <OrderInfo/>
        </Route>
        <Route path={'/'}>
          <ProfileMenu />
          <Switch location={background || location}>
            <Route path="/profile" exact={true}>
              <ProfileForm />
            </Route>
            <Route path="/profile/orders" exact={true}>
              <OrderList orderList={orders.orders.orders || []} showStatus={true}/>
            </Route>
          </Switch>
        </Route>
      </Switch>
      {background && (
        <Modal title="Заказ" onClick={() => {
          history.push('/profile/orders');
        }}>
          <OrderInfo/>
        </Modal>
      )}
    </div>
  );
};