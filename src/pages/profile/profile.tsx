import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/hooks';
import { Redirect, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import ProfileForm from '../../components/profile-form/profile-form';
import OrderList from '../../components/order-list/order-list';
import OrderInfo from '../../components/order-info/order-info';
import Modal from '../../components/modal/modal';
import { wsUserConnectionStart } from '../../services/actions/wsUser';
import { RootState } from '../../services/types';

interface IBackgroundLocation {
  background: {
    pathname: string
    search: string
    hash: string
    state: undefined
    key: string
  }
}

const Profile: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<IBackgroundLocation | undefined>();
  const history = useHistory();
  const background = history.action === 'PUSH' && location.state && location.state.background;
  const { isAuth } = useSelector((store: RootState) => store.user);
  const orders = useSelector((store: RootState | any) => store.userOrders);

  useEffect(() => {
    if(!orders.wsConnected) {
      dispatch(wsUserConnectionStart());
    }
  }, [dispatch, orders.wsConnected]);

  if (!isAuth) {
    return (
      <Redirect to={"/"}/>
    );
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
        <Modal header="Заказ" onClick={() => {
          history.push('/profile/orders');
        }}>
          <OrderInfo/>
        </Modal>
      )}
    </div>
  );
};

export default Profile;